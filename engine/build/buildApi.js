require("module-alias/register");
const highlightMessage = require("@ezycore/shared/utils/highlightMessage");
const webpack = require("webpack");
const webpackSsrConfig = require("@ezycore/engine/build/webpack/webpack.api.config");
const config = webpackSsrConfig("production");
const compiler = webpack(config);

highlightMessage("info", `Compiling project ${process.env.APP_NAME}`);

require("./commons/runCompiler")(compiler)
  .then(() => highlightMessage("success", `Project ${process.env.APP_NAME} compiled !`))
  .catch((error) => {
    console.error(error.message || error);
    process.exitCode = 1;
  });
