require("module-alias/register");
const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const LoadablePlugin = require("@loadable/webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const alias = require("@root/configs/aliases");

const serverConf = (mode) => {
  return {
    mode: mode,
    target: "node",
    entry: path.resolve(process.cwd(), "server", "prod-server.js"),
    output: {
      filename: "server.js",
      path: path.resolve(process.cwd(), "build/"),
      publicPath: "/",
      chunkFilename: "statics/[chunkhash].chunk.js",
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
          loader: "file-loader",
          options: {
            name: "img/[name].[ext]",
            outputPath: "/statics/",
            publicPath: "/statics/",
          },
        },
        {
          test: /\.svg$/,
          loader: "svg-inline-loader",
        },
      ],
    },
    plugins: [
      new Dotenv({
        path: path.resolve(process.cwd(), ".env"),
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
    mode: mode,
    target: "web",
    entry: path.resolve(process.cwd(), "src/client", "index.js"),
    output: {
      path: path.resolve(process.cwd(), "build/statics/"),
      publicPath: "/statics/",
      filename: "js/[name].[contenthash].js",
      chunkFilename: "js/[name].[contenthash].chunk.js",
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
            name: "img/[name].[ext]",
            outputPath: "/statics/",
            publicPath: "/statics/",
          },
        },
        {
          test: /\.(woff2?|eot|ttf|otf)$/i,
          type: "asset/resource",
          generator: { filename: "fonts/[name][hash][ext][query]" },
        },
      ],
    },

    plugins: [
      new Dotenv({
        path: path.resolve(process.cwd(), ".env"),
      }),
      new webpack.DefinePlugin({
        SSR_APP: true,
      }),
      new MiniCssExtractPlugin({}),
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
