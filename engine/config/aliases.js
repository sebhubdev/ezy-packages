const fs = require("fs");
const path = require("path");
const { root } = require("./paths");

const createAliases = (appPath) => {
  if (typeof appPath !== "string" || !appPath.trim()) {
    throw new Error("Cannot create aliases: provide a non-empty appPath (APP_PATH).");
  }

  const resolvedAppPath = path.resolve(root, appPath);
  if (!fs.existsSync(resolvedAppPath) || !fs.statSync(resolvedAppPath).isDirectory()) {
    throw new Error(`Cannot create aliases: app directory does not exist: ${resolvedAppPath}`);
  }

  const overrides = path.join(resolvedAppPath, "src/overrides");
  return {
    "@root": root,
    "@ezycore": [overrides, path.join(root, "core")],
    "@ui": [path.join(overrides, "ui"), path.join(root, "core/ui")],
    "@modules": [path.join(overrides, "modules"), path.join(root, "core/modules")],
    "@shared": [path.join(overrides, "shared"), path.join(root, "core/shared")],
  };
};

module.exports = createAliases;
