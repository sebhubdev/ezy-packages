const chalk = require("chalk");

const highlightMessage = async (type = "info", msg) => {
  let color;

  switch (type) {
    case "info":
      color = "white";
      break;
    case "error":
      color = "red";
      break;
    case "success":
      color = "green";
      break;
    default:
      color = "white";
      break;
  }
  await import("boxen").then((res) => {
    const boxen = res.default;
    const highMsg = `${chalk.bold[color](msg)}`;

    console.log(
      boxen(highMsg, {
        padding: 1,
        margin: 1,
        borderStyle: "double",
        borderColor: color,
        title: `Ezy Core [${type.toUpperCase()}]`,
        textAlign: "left",
        textAlignment: "left",
      }),
    );
  });
};

module.exports = highlightMessage;
