require("module-alias/register");
const path = require("path");
const express = require("express");
const webpack = require("webpack");
const cors = require("cors");
const HotModuleReplacementPlugin =
  require("webpack").HotModuleReplacementPlugin;
const Dotenv = require("dotenv-webpack");
const alias = require("@root/configs/aliases");
const { root } = require("@root/configs/paths");
const appPath = process.env.APP_PATH;
require("dotenv").config({
  path: path.join(appPath, `.env`),
});
const launchProjectInNavigator =
  process.env.LAUNCH_PROJECT_IN_NAVIGATOR === "true" ?? false;
const port = process.env.PORT ?? 3000;

const devServer = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  const webpackCompiler = webpack({
    entry: ["webpack-hot-middleware/client", `${appPath}/src/client/index.js`],
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
          exclude: "/packages/",
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
        {
          test: /\.(woff2?|eot|ttf|otf|txt)$/i,
          type: "asset/resource",
          generator: {
            filename: "fonts/[name][hash][ext][query]",
            publicPath: "/",
          },
        },
      ],
    },
    plugins: [
      new HotModuleReplacementPlugin(),
      new Dotenv({
        path: path.resolve(`${appPath}/.env`),
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

  app.use(express.static(`${appPath}/public`));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(`${root}/packages/runtime/src/commons/index.html`),
    );
  });

  app.listen(port, async () => {
    console.log(`Started server on port "${port}".`);
    if (launchProjectInNavigator) {
      import("open").then((res) => {
        const open = res.default;
        open(`http://localhost:${port}/`);
      });
    }
  });
};

devServer();
