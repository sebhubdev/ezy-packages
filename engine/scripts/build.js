require("./runApps")("build").catch((error) => {
  console.error(error.message || "An app failed.");
  process.exitCode = 1;
});
