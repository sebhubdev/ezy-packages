const path = require("path");
const root = path.resolve(__dirname, "../../..");

module.exports = {
  root,
  apps: path.join(root, "apps"),
  core: path.join(root, "core"),
};
