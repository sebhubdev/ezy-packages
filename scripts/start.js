const chalk = require("chalk");
import("boxen").then((res) => {
  const boxen = res.default;
  const msg = `
      ${chalk.bold("Storybook 9.1.6 for react-webpack5 started")}
      ${chalk.gray("146 ms for manager and 3.36 s for preview")}
    
      ${chalk.bold("Local:")}            ${chalk.cyan("http://localhost:6006/")}
      ${chalk.bold("On your network:")}  ${chalk.cyan(
        "http://192.168.1.3:6006/"
      )}
    `;

  console.log(
    boxen(msg, {
      padding: 1,
      margin: 1,
      borderStyle: "double", // opciones: single, double, round, bold, etc.
      borderColor: "whiteBright",
      title: "holaaaaa",
      textAlign: "left",
      textAlignment: "left",
    })
  );

  console.log(chalk.bold.red("in the creator"));
  console.log(chalk.blue("in the creator"));
  console.log(chalk.green("in the creator"));
  console.log("in the creator");
});

require("@frontend/server/dev-server.js");
