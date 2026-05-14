const fsPromises = require("fs/promises");
const { apps: appsDir } = require("@ezycore/engine/config/paths");

const getAppsNames = async () => {
  const apps = (await fsPromises.readdir(appsDir, { withFileTypes: true }))
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  return apps;
};

module.exports = getAppsNames;
