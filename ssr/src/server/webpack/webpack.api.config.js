require("module-alias/register");
const path = require("path");
const Dotenv = require("dotenv-webpack");
const alias = require("@root/configs/webpack/aliases");

const serverConf = (mode) => {
  return {
    mode: mode,
    target: "node",
    entry: path.resolve(process.cwd(), "server.js"),
    output: {
      path: path.resolve(process.cwd(), "build"),
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
        path: path.resolve(process.cwd(), ".env"),
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
  return serverConf(mode);
};

module.exports = webpackApiConfig;
