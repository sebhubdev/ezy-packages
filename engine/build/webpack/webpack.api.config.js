require("module-alias/register");
const path = require("path");
const Dotenv = require("dotenv-webpack");
const alias = require("@ezycore/engine/config/aliases");
const appsAliases = require("@root/.ezycore/appsAliases");
const webpack = require("webpack");

const serverConf = (mode) => {
  return {
    mode: mode,
    target: "node",
    externals: {
      puppeteer: "commonjs puppeteer",
      "puppeteer-core": "commonjs puppeteer-core",
      sharp: "commonjs sharp",
    },
    entry: path.resolve(process.env.APP_PATH, "server.js"),
    output: {
      path: path.resolve(process.env.APP_PATH, "build"),
      filename: "server.js",
      clean: true,
    },
    externalsPresets: { node: true },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                ["@babel/preset-env", { targets: { node: "18" } }],
              ],
            },
          },
        },
      ],
    },
    plugins: [
      new Dotenv({
        path: path.resolve(process.env.APP_PATH, ".env"),
      }),
      new webpack.DefinePlugin({
        REMOTE: JSON.stringify(process.env.REMOTE || "false"),
      }),
    ],
    resolve: {
      alias: {
        ...appsAliases,
        ...alias,
        "utf-8-validate": false,
        bufferutil: false,
      },
      extensions: [".js", ".jsx"],
    },
    node: {
      __dirname: false,
      __filename: false,
    },
  };
};
const webpackApiConfig = (mode = "development") => {
  return serverConf(mode);
};

module.exports = webpackApiConfig;
