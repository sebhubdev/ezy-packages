const concurrently = require("concurrently");
const chalk = require("chalk");
const fs = require("fs");

const args = process.argv.slice(3);

const execute = () => {
  if (!args[0]) {
    console.log(chalk.bold.red("No project to start"));
    return;
  }

  const projectsToLaunch = [];

  args.map((arg) => {
    if (fs.existsSync(`./apps/${arg}`)) {
      projectsToLaunch.push({
        command: `cd apps/${arg} && node server/dev-server.js --env production`,
        name: arg,
        prefixColor: "blue",
      });
    } else {
      console.log(chalk.bold.red(`No project found for ${arg}`));
    }
  });
  concurrently(projectsToLaunch);
};

execute();

// const { commands, result } = concurrently(
//   [
//     { command: "npm run front:dev", name: "front", prefixColor: "blue" },
//     { command: "npm run admin:dev", name: "admin", prefixColor: "orange" },
//     { command: "npm run builder:dev", name: "builder", prefixColor: "red" },
//     { command: "npm run api:dev", name: "api", prefixColor: "green" },
//     { command: "npm run ui", name: "StoryBook", prefixColor: "white" },
//   ],
//   {
//     prefix: "name",
//     killOthers: ["failure"],
//   }
// );

// result
//   .then(() => {
//     console.log("✅ All processes exited successfully");
//   })
//   .catch((err) => {
//     console.error("❌ One of the processes failed", err);
//     process.exit(1);
//   });
