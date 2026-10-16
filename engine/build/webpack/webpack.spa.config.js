const createSassOptions = require("../utils/createSassOptions");
require("module-alias/register");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const LoadablePlugin = require("@loadable/webpack-plugin");
const Dotenv = require("dotenv-webpack");
const createAliases = require("@ezycore/engine/config/aliases");
const appsAliases = require("@root/.ezycore/appsAliases");
const webpack = require("webpack");

const clientConf = (mode) => {
  const alias = createAliases(process.env.APP_PATH);
  return {
    mode: mode,
    target: "web",
    entry: path.resolve(process.cwd(), "src/client", "index.js"),
    output: {
      path: path.resolve(process.cwd(), "build"),
      publicPath: "auto",
      filename: "js/[name].[contenthash].js",
      chunkFilename: "js/[name].[contenthash].chunk.js",
      clean: true,
    },
    optimization: {
      splitChunks: { chunks: "all" },
      runtimeChunk: "single",
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                ["@babel/preset-env", { targets: { node: "current" } }],
                "@babel/preset-react",
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
                publicPath: "/statics/",
              },
            },
            "css-loader",
            {
              loader: "sass-loader",
              options: createSassOptions(process.env.APP_PATH),
            },
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
            outputPath: "/",
            publicPath: "/",
          },
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
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash].css",
        chunkFilename: "css/[id].[contenthash].css",
      }),
      new LoadablePlugin(),
      new Dotenv({
        path: path.resolve(process.cwd(), ".env"),
      }),
      new webpack.DefinePlugin({
        SSR_APP: false,
      }),
    ],
    resolve: {
      alias: { ...appsAliases, ...alias },
      extensions: [".js", ".jsx"],
    },
  };
};
const webpackSpaConfig = (mode = "development") => {
  return clientConf(mode);
};

module.exports = webpackSpaConfig;
