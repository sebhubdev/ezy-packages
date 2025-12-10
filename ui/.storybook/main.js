import { join, dirname } from "path";
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}

/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    getAbsolutePath("@storybook/addon-webpack5-compiler-swc"),
    getAbsolutePath("@storybook/addon-docs"),
    "storybook-preset-inline-svg",
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-webpack5"),
    options: {},
  },
  webpackFinal: async (config) => {
    // añade alias JS/TS
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@ezycore/ui": path.resolve(__dirname, "../src"),
      "@ezycore/i18n": path.resolve(__dirname, "../../i18n/src"),
    };

    config.module.rules.push({
      test: /\.(scss)$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: "",
          },
        },
        ,
        "css-loader",
        "sass-loader",
      ],
    });
    config.plugins.push(new MiniCssExtractPlugin());
    config.stats = false;
    return config;
  },
};
export default config;
