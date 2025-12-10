const path = require("path");
module.exports = {
  "@ezycore/admin": path.resolve(`./apps/admin/src/`),
  "@ezycore/builder": path.resolve(`./apps/builder/src/`),
  "@ezycore/frontend": path.resolve(`./apps/frontend/src/`),
  "@ezycore/api": path.resolve(`./apps/api/src/`),
  "@ezycore/assets": path.resolve(`./packages/assets/src/`),
  "@ezycore/hooks/src": path.resolve(`./packages/hooks/src/`),
  "@ezycore/i18n": path.resolve(`./packages/i18n/src/`),
  "@ezycore/ui": path.resolve(`packages/ui/src/`),

  "@ezycore/utils": path.resolve(`./packages/utils/src/`),
};
