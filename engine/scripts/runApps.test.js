const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function fixture({ missingStats = false, failure = false } = {}) {
  const state = { generated: 0, launches: [], checked: [] };
  const types = { website: 'ssr', backend: 'api', client: 'spa' };
  const mocks = {
    'module-alias/register': {},
    path,
    'fs/promises': {
      stat: async () => ({ isFile: () => true }),
      access: async (file) => {
        state.checked.push(file);
        if (missingStats) throw new Error('missing stats');
      },
    },
    concurrently: (commands) => {
      state.launches.push(...commands);
      return { result: failure ? Promise.reject(new Error('child failed')) : Promise.resolve() };
    },
    '../config/paths': { root: '/repo', apps: '/repo/apps' },
    '../helpers/getAppsNames': async () => Object.keys(types),
    '../helpers/getAppEnvironment': (appPath, config) => ({ APP_PATH: appPath, APP_TYPE: config.type }),
    '../generators/validateAppNames': () => {},
    '../generators': { generateAliases: async () => state.generated++ },
  };
  const module = { exports: {} };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, 'runApps.js'), 'utf8'), {
    module, process: { argv: ['node', 'ezy-core', 'action'], execPath: '/node' },
    require: (name) => {
      if (name in mocks) return mocks[name];
      const project = path.basename(path.dirname(name));
      if (project in types) return { default: { type: types[project] } };
      throw new Error(`Unexpected import: ${name}`);
    },
  });
  return { state, run: module.exports };
}

test('start launches SSR, API and SPA builds with their proper directories', async () => {
  const { run, state } = fixture();
  await run('start');
  assert.equal(state.generated, 0);
  assert.equal(state.launches.length, 3);
  assert.equal(state.launches[0].cwd, '/repo/apps/website/build');
  assert.ok(state.launches[0].command.includes('/build/server/server.js'));
  assert.ok(state.launches[1].command.includes('/backend/build/server.js'));
  assert.equal(state.launches[1].cwd, '/repo/apps/backend');
  assert.ok(state.launches[2].command.includes('launchSpaServer.js'));
  assert.ok(state.launches.every(command => command.env.NODE_ENV === 'production'));
  assert.deepEqual(state.checked, ['/repo/apps/website/build/client/loadable-stats.json']);
});

test('an incomplete SSR build prevents any apps from launching', async () => {
  const { run, state } = fixture({ missingStats: true });
  await assert.rejects(run('start'), /Build missing or incomplete/);
  assert.equal(state.launches.length, 0);
});

test('start propagates failures of child processes', async () => {
  await assert.rejects(fixture({ failure: true }).run('start'), /child failed/);
});
