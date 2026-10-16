const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const createApp = require('./createApp');

async function fixture(t) {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'ezy-create-'));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  await fs.mkdir(path.join(root, 'apps/intranet'), { recursive: true });
  await fs.writeFile(path.join(root, 'apps/intranet/app.config.js'), 'export default {name:"intranet",type:"ssr",port:3002};');
  await fs.writeFile(path.join(root, 'apps/intranet/.env'), 'PORT=3000\n');
  return root;
}

test('creates an SSR app, reserves an unused configured port and generates configs', async (t) => {
  const root = await fixture(t);
  let generated = false;
  const result = await createApp('site', { type: 'ssr', projectRoot: root, generate: async () => {
    const config = await fs.readFile(path.join(root, 'apps/site/app.config.js'), 'utf8');
    assert.ok(config.includes('name: "site"'));
    generated = true;
  } });
  assert.equal(result.port, 3001);
  assert.equal(generated, true);
  const app = result.appPath;
  assert.equal(JSON.parse(await fs.readFile(path.join(app, 'package.json'))).name, 'site');
  const config = await fs.readFile(path.join(app, 'app.config.js'), 'utf8');
  assert.ok(config.includes('title: "site"'));
  assert.ok(config.includes('port: 3001'));
  assert.equal(await fs.readFile(path.join(app, '.env'), 'utf8'), await fs.readFile(path.join(app, '.env.sample'), 'utf8'));
  assert.ok(config.includes('favicon: "/favicon.ico"'));
  // New apps receive their own usable branding, including the dark variant.
  const branding = path.join(__dirname, '../../../ui/assets/branding/ezycore');
  for (const file of ['ezycore-color.png', 'ezycore-dark.png', 'ezycore-mono.png']) {
    assert.deepEqual(await fs.readFile(path.join(app, 'src/assets/img', file)), await fs.readFile(path.join(branding, file)));
  }
  for (const file of ['favicon.svg', 'favicon.ico', 'favicon-16.png', 'favicon-32.png', 'favicon-48.png', 'favicon-180.png', 'favicon-256.png']) {
    assert.deepEqual(await fs.readFile(path.join(app, 'public', file)), await fs.readFile(path.join(branding, file)));
  }
  await fs.access(path.join(app, 'src/pages/Home.js'));
});

test('validates name, type, port and existing destinations before creating an app', async (t) => {
  const root = await fixture(t);
  const options = { projectRoot: root, type: 'ssr', generate: async () => {} };
  for (const name of ['../outside', 'ui', 'bad name', 'Intranet']) {
    await assert.rejects(createApp(name, options));
  }
  await assert.rejects(createApp('site', { ...options, type: 'spa' }), /SSR template/);
  await assert.rejects(createApp('site', { ...options, port: 0 }), /Port/);
  await assert.rejects(createApp('site', { ...options, port: 3.5 }), /Port/);
  await assert.rejects(fs.access(path.join(root, 'apps/site')));
  await fs.mkdir(path.join(root, 'apps/site'));
  await fs.writeFile(path.join(root, 'apps/site/keep.txt'), 'existing');
  await assert.rejects(createApp('site', options), /already exists/);
  assert.equal(await fs.readFile(path.join(root, 'apps/site/keep.txt'), 'utf8'), 'existing');
});

test('restores generated files and removes only the new app if generation fails', async (t) => {
  const root = await fixture(t);
  await fs.writeFile(path.join(root, 'jsconfig.json'), '{"custom":true}\n');
  await fs.writeFile(path.join(root, 'apps/intranet/jsconfig.json'), '{"app":true}\n');
  await assert.rejects(createApp('site', { type: 'ssr', port: 3010, projectRoot: root, generate: async () => {
    await fs.writeFile(path.join(root, 'jsconfig.json'), 'changed');
    await fs.writeFile(path.join(root, 'apps/intranet/jsconfig.json'), 'changed');
    await fs.mkdir(path.join(root, '.ezycore'));
    await fs.writeFile(path.join(root, '.ezycore/appsAliases.js'), 'changed');
    throw new Error('generation failed');
  } }), /generation failed/);
  await assert.rejects(fs.access(path.join(root, 'apps/site')));
  assert.equal(await fs.readFile(path.join(root, 'jsconfig.json'), 'utf8'), '{"custom":true}\n');
  assert.equal(await fs.readFile(path.join(root, 'apps/intranet/jsconfig.json'), 'utf8'), '{"app":true}\n');
  await assert.rejects(fs.access(path.join(root, '.ezycore/appsAliases.js')));
});
