require("module-alias/register");
const highlightMessage = require("@ezycore/utils/src/highlightMessage");
const path = require("path");
const webpack = require("webpack");
const { spawn } = require("child_process");
const webpackApiConfig = require("@ezycore/build/src/webpack/webpack.api.config");
const configs = webpackApiConfig("development");
const compiler = webpack(configs);
const { root } = require("@ezycore/build/src/paths");
const serverBundle = path.resolve(process.env.APP_PATH, "build/server.js");

const appPath = process.env.APP_PATH;

let nodemonProc = null;
let started = false;

function startNodemon() {
  if (nodemonProc) return;
  nodemonProc = spawn(
    process.platform === "win32" ? "npx.cmd" : "npx",
    [
      "nodemon",
      "--watch",
      serverBundle,
      "--delay",
      "200ms",
      "--exec",
      `node ${serverBundle}`,
      "--ignore",
      path.resolve(process.env.APP_PATH, "build/client"),
    ],
    { stdio: "inherit", env: process.env },
  );
}

const apiWatcher = () => {
  highlightMessage("info", `Launching Webpack`);
  compiler.watch({ aggregateTimeout: 200 }, (err, stats) => {
    if (err) {
      console.error("[WEBPACK] Fatal:", err);
      return;
    }

    if (stats.hasErrors()) {
      console.error(
        stats.toString({
          colors: true,
          all: false,
          errors: true,
          warnings: true,
        }),
      );
      return;
    }

    if (!started) {
      started = true;
      highlightMessage("success", `Project compiled !!`);
      highlightMessage("info", `Starting SSR server`);
      startNodemon();
    }
  });
};

apiWatcher();
