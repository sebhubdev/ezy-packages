require("../runners/runApps")("start").catch((error) => {
  console.error(error.message || "An app failed to start.");
  process.exitCode = 1;
});
