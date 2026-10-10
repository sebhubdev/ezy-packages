const fs = require("fs/promises");
const path = require("path");
const { apps: appsDir } = require("../config/paths");

const getAppsNames = async (directory = appsDir) => {
  let entries;
  try {
    entries = await fs.readdir(directory, { withFileTypes: true });
  } catch (error) {
    throw new Error(`Cannot discover apps in ${directory}: ${error.message}`, {
      cause: error,
    });
  }

  const apps = [];
  for (const entry of entries
    .filter((item) => item.isDirectory())
    .sort((a, b) => a.name.localeCompare(b.name))) {
    const appPath = path.join(directory, entry.name);
    const configPath = path.join(appPath, "app.config.js");
    let config;
    try {
      config = await fs.stat(configPath);
    } catch (error) {
      if (error.code === "ENOENT") continue;
      throw new Error(
        `Cannot inspect app config ${configPath}: ${error.message}`,
        { cause: error },
      );
    }
    if (!config.isFile()) {
      throw new Error(
        `Invalid app ${JSON.stringify(entry.name)}: ${configPath} must be a file.`,
      );
    }

    const srcPath = path.join(appPath, "src");
    let src;
    try {
      src = await fs.stat(srcPath);
    } catch (error) {
      throw new Error(
        `Invalid app ${JSON.stringify(entry.name)}: cannot read source directory ${srcPath}: ${error.message}`,
        { cause: error },
      );
    }
    if (!src.isDirectory()) {
      throw new Error(
        `Invalid app ${JSON.stringify(entry.name)}: ${srcPath} must be a directory.`,
      );
    }
    apps.push(entry.name);
  }
  return apps;
};

module.exports = getAppsNames;
