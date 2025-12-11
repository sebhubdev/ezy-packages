const webpack = require("webpack");
console.log("Init build");

const webpackConf = require("../config/webpack.config.js");

webpack(webpackConf).run((err, stats) => {
  // see https://webpack.js.org/api/node/#error-handling
  if (err) {
    console.log("error", "Failed to build the production files.", err.message);
    process.exit(1);
  }

  if (stats.hasErrors()) {
    console.log(
      "error",
      "A compilation error occurred when building files.",
      stats.toJson().errors
    );
    process.exit(1);
  }
});
