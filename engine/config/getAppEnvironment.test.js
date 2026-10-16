const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const getAppEnvironment = require('./getAppEnvironment');
test('app environments stay isolated and shell settings win', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ezy-env-'));
  try {
    const a = path.join(root, 'a'), b = path.join(root, 'b');
    fs.mkdirSync(a); fs.mkdirSync(b);
    fs.writeFileSync(path.join(a, '.env'), 'PORT=4000\nONLY_A=yes\n');
    fs.writeFileSync(path.join(b, '.env'), 'ONLY_B=yes\n');
    const shell = { PORT: '5000' };
    assert.equal(getAppEnvironment(a, { port: 3000 }, shell).PORT, '5000');
    assert.equal(getAppEnvironment(a, { port: 3000 }, {}).PORT, '4000');
    assert.equal(getAppEnvironment(b, { port: 3001 }, {}).PORT, '3001');
    assert.equal(getAppEnvironment(b, {}, shell).ONLY_A, undefined);
    assert.deepEqual(shell, { PORT: '5000' });
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});
