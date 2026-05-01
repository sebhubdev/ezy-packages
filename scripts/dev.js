require("module-alias/register");
const concurrently = require("concurrently");
const chalk = require("chalk");
const fs = require("fs");
const fsPromises = require("fs/promises");
const dotenv = require("dotenv");
const path = require("path");
const highlightMessage = require("@ezycore/utils/src/highlightMessage");

const appsDir = path.resolve(process.cwd(), "apps");
const args = process.argv.slice(3);

const execute = async () => {
  let projects = args.length
    ? args
    : await fsPromises.readdir(appsDir, { withFileTypes: false });

  if (!projects.length) {
    console.log(chalk.bold.red("No project to start"));
    return;
  }

  const projectsToLaunch = [];

  projects.map(async (project) => {
    const appPath = path.resolve(process.cwd(), `apps/${project}`);
    process.env.APP_PATH = appPath;

    if (fs.existsSync(`./apps/${project}`)) {
      const configPath = path.join(appPath, "app.config.js");
      if (!fs.existsSync(configPath)) {
        highlightMessage("error", `No config file found for ${project}`);
        return;
      }
      const appConfig = require(configPath).default;
      const appEnvPath = path.join(appPath, ".env");

      if (!fs.existsSync(appEnvPath)) {
        highlightMessage("error", "No env file found");
        return;
      }

      process.env.APP_TYPE = appConfig.type;
      process.env.APP_NAME = appConfig.name;

      console.log("project", appConfig);

      dotenv.config({
        path: appEnvPath,
        override: true,
      });

      const projectName = appConfig.name ?? "no-name-project";
      const projectType = appConfig.type ?? "spa";
      const prefixColor = appConfig.prefixColor ?? "greenBright";

      const command = {
        api: `cross-env NODE_ENV=development node packages/runtime/src/commons/launchApiServer.js`,
        spa: `cd apps/${project} && NODE_ENV=development node server/hmr-server.js`,
        ssr: `cross-env NODE_ENV=development node packages/runtime/src/commons/launchServer.js`,
      }[projectType];

      console.log("Comand", command);

      highlightMessage("success", `Launching project ${projectName}`);

      concurrently([
        {
          command: command,
          name: projectName,
          prefixColor: prefixColor,
        },
      ]);
    } else {
      highlightMessage("error", `No project found for ${project}`);
    }
  });
};

execute();
