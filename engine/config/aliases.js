const path = require("path");
const { root } = require("./paths");
module.exports = {
  "@root": path.resolve(root),
  "@ezycore": [
    path.resolve(root, `${process.env.APP_PATH}/src/overrides`),
    path.resolve(root, `packages/`),
  ],
  "@ui": [
    path.resolve(root, `${process.env.APP_PATH}/src/overrides/ui`),
    path.resolve(root, `packages/ui`),
  ],
  "@modules": [
    path.resolve(root, `${process.env.APP_PATH}/src/overrides/modules`),
    path.resolve(root, `packages/modules/`),
  ],
  "@shared": [
    path.resolve(root, `${process.env.APP_PATH}/src/overrides/shared`),
    path.resolve(root, `packages/shared/`),
  ],
};
