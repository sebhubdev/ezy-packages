import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const tool = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const root = path.resolve(tool, "../../..");
// Reuse Ezy's alias factory and generated application aliases without loading
// its build configuration, environment files, or any application overrides.
const createAliases = require(
  path.join(root, "packages/engine/config/aliases.js"),
);
const appAliases = require(path.join(root, ".ezycore/appsAliases.js"));
const aliases = { ...appAliases, ...createAliases(tool) };

export default {
  stories: ["../stories/**/*.stories.jsx"],
  framework: "@storybook/react-webpack5",
  addons: [
    "@storybook/addon-webpack5-compiler-babel",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
  ],
  core: { disableTelemetry: true },
  babel: async (options) => ({
    ...options,
    presets: [
      require.resolve("@babel/preset-env"),
      require.resolve("@babel/preset-react"),
    ],
  }),
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      ...aliases,
      // Core files resolve from the parent workspace; force the preview and
      // Storybook renderer to share this tool's React, including JSX runtimes.
      react: path.dirname(require.resolve("react/package.json")),
      "react-dom": path.dirname(require.resolve("react-dom/package.json")),
    };
    config.module.rules.push({
      test: /\.s[ac]ss$/i,
      use: [
        require.resolve("style-loader"),
        require.resolve("css-loader"),
        {
          loader: require.resolve("sass-loader"),
          options: { implementation: require("sass"), api: "modern" },
        },
      ],
    });
    // Icon/icons.js expects SVG markup strings, not asset URLs or components.
    const excludeSvg = (rules) =>
      rules.forEach((rule) => {
        if (rule.oneOf) excludeSvg(rule.oneOf);
        if (rule.test?.test?.("icon.svg"))
          rule.exclude = [rule.exclude, /\.svg$/i].filter(Boolean);
      });
    excludeSvg(config.module.rules);
    config.module.rules.push({ test: /\.svg$/i, type: "asset/source" });
    return config;
  },
};
