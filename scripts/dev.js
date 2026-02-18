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
        highlightMessage("error", "No config file found");
        return;
      }
      const appConfig = require(configPath).default;
      const appEnvPath = path.join(appPath, ".env");
      const disableSSR = process.env.DISABLE_SSR === "true";

      if (!fs.existsSync(appEnvPath)) {
        highlightMessage("error", "No env file found");
        return;
      }

      dotenv.config({
        path: appEnvPath,
        override: true,
      });

      const projectName = appConfig.name ?? "no-name-project";
      const projectType = appConfig.type ?? "spa";
      const projectColor = appConfig.color ?? "orange";

      const command = {
        api: `cd apps/${project} && nodemon server.js`,
        spa: `cd apps/${project} && NODE_ENV=development node server/hmr-server.js`,
        ssr: `cross-env NODE_ENV=development node packages/runtime/src/commons/launchServer.js`,
      }[projectType];

      console.log(command);

      projectsToLaunch.push({
        command: command,
        name: projectName,
        prefixColor: projectColor,
      });
    } else {
      highlightMessage("error", `No project found for ${project}`);
    }
  });

  if (projectsToLaunch.length) {
    highlightMessage(
      "success",
      `Launching project${projects.length > 1 ? "s" : ""} ${projects}`,
    );
    concurrently(projectsToLaunch);
  }
};

execute();
