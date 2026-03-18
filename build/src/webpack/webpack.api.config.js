require("module-alias/register");
const path = require("path");
const Dotenv = require("dotenv-webpack");
const alias = require("@ezycore/build/src/aliases");

const serverConf = (mode) => {
  return {
    mode: mode,
    target: "node",
    externals: {
      puppeteer: "commonjs puppeteer",
      "puppeteer-core": "commonjs puppeteer-core",
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
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                ["@babel/preset-env", { targets: { node: "18" } }],
                "@babel/preset-typescript",
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
    ],
    resolve: {
      alias: { ...alias, "utf-8-validate": false, bufferutil: false },
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    node: {
      __dirname: false,
      __filename: false,
    },
  };
};
const webpackApiConfig = (mode = "development") => {
  console.log(mode);

  return serverConf(mode);
};

module.exports = webpackApiConfig;
