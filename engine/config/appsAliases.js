const path = require("path");
const { root } = require("./paths");

module.exports = {
    "@api": path.resolve(root, 'apps/api/src/'),
		"@frontend": path.resolve(root, 'apps/frontend/src/')        
};
  