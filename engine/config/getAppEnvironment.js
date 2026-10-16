const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

// Shell > app .env > app.config.js defaults. Never mutate the parent environment.
module.exports = (appPath, config, environment = process.env) => {
  const envPath = path.join(appPath, ".env");
  const fileEnv = fs.existsSync(envPath) ? dotenv.parse(fs.readFileSync(envPath)) : {};
  return {
    ...(config.port == null ? {} : { PORT: String(config.port) }),
    ...fileEnv,
    ...environment,
    APP_PATH: appPath,
    APP_NAME: config.name ?? path.basename(appPath),
    APP_TYPE: config.type ?? "spa",
  };
};
