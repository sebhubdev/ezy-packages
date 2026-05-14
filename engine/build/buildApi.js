require("module-alias/register");
const highlightMessage = require("@ezycore/shared/utils/highlightMessage");
const webpack = require("webpack");
const webpackSsrConfig = require("@ezycore/engine/build/webpack/webpack.api.config");
const config = webpackSsrConfig("production");
const compiler = webpack(config);

highlightMessage("info", `Compiling project ${process.env.APP_NAME}`);

compiler.run((err, stats) => {
  if (err) {
    console.error(err);
    return;
  }

  highlightMessage("success", `Project ${process.env.APP_NAME} compiled !`);

  compiler.close(() => {});
});
