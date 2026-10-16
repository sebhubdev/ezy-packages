const { test } = require('node:test');
const assert = require('node:assert/strict');
const runCompiler = require('./runCompiler');
for (const kind of ['success', 'fatal', 'stats', 'close']) {
  test(`compiler closes and reports ${kind}`, async () => {
    let closed = false;
    const compiler = {
      run(cb) { cb(kind === 'fatal' ? new Error('fatal') : null, { hasErrors: () => kind === 'stats', toString: () => 'stats error' }); },
      close(cb) { closed = true; cb(kind === 'close' ? new Error('close') : null); },
    };
    if (kind === 'success') await runCompiler(compiler);
    else await assert.rejects(runCompiler(compiler), new RegExp(kind));
    assert.equal(closed, true);
  });
}
