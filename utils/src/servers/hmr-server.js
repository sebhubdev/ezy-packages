const path = require("path");
const express = require("express");
const webpack = require("webpack");
const cors = require("cors");
const HotModuleReplacementPlugin =
  require("webpack").HotModuleReplacementPlugin;
const Dotenv = require("dotenv-webpack");
require("dotenv").config({
  path: path.resolve(process.cwd(), ".env"),
});
const alias = require("@root/configs/webpack/aliases");
const { root } = require("@root/configs/webpack/paths");

const hmrServer = (port, appName) => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  const webpackCompiler = webpack({
    entry: [
      "webpack-hot-middleware/client",
      `${root}/apps/${appName}/src/client/index.js`,
    ],
    mode: "development",
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "ts-loader",
              options: {
                transpileOnly: true, // rápido
                compilerOptions: { noEmit: false }, // override al tsconfig
              },
            },
          ],
        },
        {
          // exclude: /node_modules/,
          test: /.js$/,
          use: {
            loader: "babel-loader",
            options: {
              plugins: ["@babel/plugin-proposal-class-properties"],
              presets: ["@babel/preset-react", "@babel/preset-env"],
            },
          },
        },
        {
          test: /\.(scss|css)$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: { sourceMap: true },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
                api: "modern",
                implementation: require("sass"),
                webpackImporter: true,
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          loader: "file-loader",
          options: {
            name: "assets/img/[name].[ext]",
          },
        },
        {
          test: /\.svg$/,
          loader: "svg-inline-loader",
        },
      ],
    },
    plugins: [
      new HotModuleReplacementPlugin(),
      new Dotenv({
        path: path.resolve(process.cwd(), `.env`),
      }),
      new webpack.DefinePlugin({
        SSR_APP: false,
      }),
    ],
    resolve: {
      alias: alias,
      extensions: [".tsx", ".ts", ".js", ".jsx"],
    },
    stats: {
      preset: "errors-warnings",
      assets: false,
      modules: false,
      entrypoints: false,
      chunkGroups: false,
      chunkModules: false,
      moduleAssets: false,
      builtAt: false,
      hash: false,
      version: false,
      children: false,
      timings: true,
    },
  });

  const webpackDevMiddleware = require("webpack-dev-middleware");
  const webpackHotMiddleware = require("webpack-hot-middleware");

  app.use(webpackDevMiddleware(webpackCompiler));
  app.use(webpackHotMiddleware(webpackCompiler));

  app.use("*", express.static(`${root}/apps/${appName}/server`));

  app.listen(port, async () => {
    console.log(`Started server on port "${port}".`);
    import("open").then((res) => {
      const open = res.default;
      open(`http://localhost:${port}/`);
    });
  });
};

module.exports = hmrServer;
