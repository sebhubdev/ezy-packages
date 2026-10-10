const path = require("path");
module.exports = (appPath) => {
  const config = require(path.join(appPath, "app.config.js")).default;
  return { lang: "en", theme: "light", title: config.name || "Ezy app", themeColor: "#f3c161", favicon: "/favicon.png", ...config.document };
};
