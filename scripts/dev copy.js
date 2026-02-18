const concurrently = require("concurrently");
const chalk = require("chalk");
const fs = require("fs");
const fsPromises = require("fs/promises");
const dotenv = require("dotenv");
const path = require("path");

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

    if (fs.existsSync(`./apps/${project}`)) {
      const configPath = path.join(appPath, "src/app.config.js");
      if (!fs.existsSync(configPath)) {
        console.log(chalk.bold.red("No config file found"));
        return;
      }
      const appConfig = require(configPath).default;

      dotenv.config({
        path: path.join(appPath, ".env"),
        override: true,
      });

      const projectName = appConfig.name ?? "no-name-project";
      const projectType = appConfig.type ?? "spa";
      const projectColor = appConfig.color ?? "orange";

      const command = {
        api: `cd apps/${project} && nodemon server.js`,
        spa: `cd apps/${project} && node server/dev-server.js --env production`,
        ssr: `PROJECT=${project} node packages/runtime/src/ssr/createDevServer.js --env production`,
      }[projectType];

      projectsToLaunch.push({
        command: command,
        name: projectName,
        prefixColor: projectColor,
      });
    } else {
      await import("boxen").then((res) => {
        const boxen = res.default;
        const msg = `
      ${chalk.bold.red(`No project found for ${project}`)}
    `;

        console.log(
          boxen(msg, {
            padding: 1,
            margin: 1,
            borderStyle: "double",
            borderColor: "red",
            title: "Ezy Core [ERROR]",
            textAlign: "left",
            textAlignment: "left",
          }),
        );
      });
    }
  });

  if (projectsToLaunch.length) {
    await import("boxen").then((res) => {
      const boxen = res.default;
      const msg = `
      ${chalk.bold.green(`Launching project${projects.length > 1 ? "s" : ""} ${projects}`)}
    `;

      console.log(
        boxen(msg, {
          padding: 1,
          margin: 1,
          borderStyle: "double",
          borderColor: "greenBright",
          title: "Ezy Core",
          textAlign: "left",
          textAlignment: "left",
        }),
      );
    });
    concurrently(projectsToLaunch);
  }
};

execute();
