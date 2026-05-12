const path = require("path");
const { root } = require("./paths");

console.log("root path", root);

module.exports = {
  "@root": path.resolve(root),
  "@frontend": path.resolve(root, `apps/frontend/src/`),
  "@api": path.resolve(root, `apps/api/src/`),
  "@ezycore": [
    path.resolve(root, `${process.env.APP_PATH}/src/overrides`),
    path.resolve(root, `packages/`),
  ],
};
