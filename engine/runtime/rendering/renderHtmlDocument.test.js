const { test } = require('node:test');
const assert = require('node:assert/strict');
const render = require('./renderHtmlDocument');
const options = { lang: 'es', theme: 'light', title: 'A & B', favicon: '/favicon.svg', themeColor: '#fff' };
test('shared document provides configured metadata and a default title', () => {
  const html = render(null, '', {}, options, { title: { toString: () => '<title data-react-helmet="true"></title>' } });
  assert.ok(html.includes('lang="es" data-theme="light"'));
  assert.ok(html.includes('<title>A &amp; B</title>'));
  assert.ok(html.includes('/favicon.svg'));
});
test('SSR state escapes script delimiters and preserves page metadata', () => {
  const data = { text: '</script><script>alert(1)</script>' };
  const html = render(data, '<main>Page</main>', {}, options, { title: { toString: () => '<title>Page</title>' } });
  const json = html.match(/id="__EZY_SSR_DATA__">\s*([\s\S]*?)\s*<\/script>/)[1];
  assert.deepEqual(JSON.parse(json), data);
  assert.ok(!json.includes('<script>'));
  assert.ok(html.includes('<title>Page</title>'));
});
