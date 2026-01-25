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
    if (fs.existsSync(`./apps/${project}`)) {
      dotenv.config({
        path: path.resolve(process.cwd(), `apps/${project}/.env`),
        override: true,
      });

      const projectName = process.env.PROJECT_NAME ?? "no-name-project";
      const projectType = process.env.PROJECT_TYPE ?? "spa";
      const projectColor = process.env.PROJECT_COLOR ?? "orange";

      const command = {
        api: `cd apps/${project} && node build/server.js`,
        spa: `cd apps/${project} && npx serve build`,
        ssr: `cd apps/${project} && node server/dev-server.js --env production`,
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
      ${chalk.bold.green(`Starting project${projects.length > 1 ? "s" : ""} ${projects}`)}
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
