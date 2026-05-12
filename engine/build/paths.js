const path = require("path");
const root = path.resolve(__dirname, "../../..");

module.exports = {
  root,
  apps: path.join(root, "apps"),
  packages: path.join(root, "packages"),
};
