require("module-alias/register");
const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const LoadablePlugin = require("@loadable/webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const nodeExternals = require("webpack-node-externals");
const alias = require("@root/configs/aliases");

const isDev = process.env.NODE_ENV == "development";

const serverConf = (mode) => {
  return {
    mode: isDev ? "development" : "production",
    target: "node",
    devtool: "source-map",
    entry: path.resolve(process.env.APP_PATH, "server", "server.js"),
    output: {
      filename: "server.js",
      path: path.resolve(process.env.APP_PATH, "build/server"),
      publicPath: "/",
      chunkFilename: "statics/js/[chunkhash].chunk.js",
      clean: true,
    },
    optimization: { minimize: false },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
              plugins: ["@loadable/babel-plugin"],
            },
          },
        },
        { test: /\.(css|s[ac]ss)$/, loader: "null-loader" },
        {
          test: /\.(png|jpe?g|gif)$/i,
          loader: "null-loader",
        },
        {
          test: /\.svg$/,
          loader: "null-loader",
        },
        {
          test: /\.(woff2?|eot|ttf|otf|txt)$/i,
          loader: "null-loader",
        },
      ],
    },
    plugins: [
      new Dotenv({
        path: path.resolve(process.env.APP_PATH, ".env"),
      }),
      new webpack.DefinePlugin({
        SSR_APP: true,
      }),
    ],
    externals: {
      Swiper: "swiper",
    },
    resolve: {
      alias: alias,
      extensions: [".ts", ".tsx", ".js", ".jsx"],
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
  };
};

const clientConf = (mode) => {
  return {
    mode: isDev ? "development" : "production",
    target: "web",
    devtool: "cheap-module-source-map",
    entry: path.resolve(process.env.APP_PATH, "src/client", "index.js"),
    output: {
      path: path.resolve(process.env.APP_PATH, "build/client"),
      publicPath: "/",
      filename: "statics/js/[name].[contenthash].js",
      chunkFilename: "statics/js/[name].[contenthash].chunk.js",
      clean: true,
    },
    optimization: {
      splitChunks: { chunks: "all" },
      runtimeChunk: "single",
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                ["@babel/preset-env", { targets: { node: "current" } }],
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
              plugins: ["@loadable/babel-plugin"],
            },
          },
        },
        {
          test: /\.(scss|css)$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: "auto",
              },
            },
            "css-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.svg$/,
          loader: "svg-inline-loader",
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          loader: "file-loader",
          options: {
            name: "statics/img/[name].[ext]",
            publicPath: "/",
          },
        },
        {
          test: /\.(woff2?|eot|ttf|otf|txt)$/i,
          type: "asset/resource",
          generator: { filename: "statics/fonts/[name][hash][ext][query]" },
        },
      ],
    },

    plugins: [
      new Dotenv({
        path: path.resolve(process.env.APP_PATH, ".env"),
      }),
      new webpack.DefinePlugin({
        SSR_APP: true,
      }),
      new MiniCssExtractPlugin({
        filename: "statics/css/[name].css",
        chunkFilename: "statics/css/[name].chunk.css",
      }),
      new LoadablePlugin(),
    ],
    resolve: {
      alias: alias,
      extensions: [".ts", ".tsx", ".js", ".jsx"],
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
  };
};

const webpackSsrConfig = (mode = "development") => {
  return [serverConf(mode), clientConf(mode)];
};

module.exports = webpackSsrConfig;
