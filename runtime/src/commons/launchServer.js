const devServer = require("./devServer");
const webpackSsrConfig = require("@ezycore/build/src/ssr/webpack.ssr.config");

const webpack = require("webpack");

const launchSever = (appConfig) => {
  const disableSSR = process.env.DISABLE_SSR === "true";
  if (disableSSR) {
    devServer(appConfig);
  } else {
    webpack(webpackSsrConfig);
  }
};

module.exports = launchSever;
