const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const babel = require('@babel/core');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');

function load(filename, dependencies = {}) {
  const code = babel.transformSync(fs.readFileSync(filename, 'utf8'), {
    filename, babelrc: false, configFile: false,
    presets: ['@babel/preset-react'],
    plugins: ['@babel/plugin-transform-modules-commonjs'],
  }).code;
  const module = { exports: {} };
  vm.runInNewContext(code, {
    module, exports: module.exports,
    require: (name) => {
      if (name === 'react') return React;
      if (name in dependencies) return dependencies[name];
      throw new Error(`Layout unexpectedly depends on ${name}`);
    },
  });
  return module.exports.default;
}
const BaseLayout = load(path.join(__dirname, 'BaseLayout.js'), {
  '@ezycore/ui/components/molecules/Loading': () => React.createElement('span', null, 'Loading'),
  '@ezycore/ui/components/molecules/BackToTop': () => React.createElement('button', null, 'Back to top'),
});
const BaseHeader = load(path.join(__dirname, '../BaseHeader/BaseHeader.js'));
const BaseFooter = load(path.join(__dirname, '../BaseFooter/BaseFooter.js'));

test('layout with only content needs no app data, header, footer or auth', () => {
  const html = renderToStaticMarkup(React.createElement(BaseLayout, null, React.createElement('main', null, 'Page')));
  assert.ok(html.includes('<main>Page</main>'));
  assert.ok(!/<header|<footer|Back to top|debug-bar|cookies-banner/.test(html));
});

test('app controls header, footer, optional widgets and loading state', () => {
  const layoutData = Object.freeze({ pathname: '/' });
  const html = renderToStaticMarkup(React.createElement(BaseLayout, {
    header: React.createElement(BaseHeader, { className: 'app-header', 'aria-label': 'App' }, 'Navigation'),
    footer: React.createElement(BaseFooter, { className: 'app-footer' }, 'Footer'),
    extras: React.createElement('aside', null, 'App widget'),
    backToTop: true, loading: true, layoutData,
  }, React.createElement('main', null, 'Previous page')));
  assert.ok(html.includes('base-header app-header'));
  assert.ok(html.includes('aria-label="App"'));
  assert.ok(html.includes('base-footer app-footer'));
  assert.ok(html.includes('<aside>App widget</aside>'));
  assert.ok(html.includes('Back to top'));
  assert.ok(html.includes('aria-busy="true"'));
  assert.ok(html.includes('inert=""'));
  assert.ok(html.includes('<main>Previous page</main>'));
});
