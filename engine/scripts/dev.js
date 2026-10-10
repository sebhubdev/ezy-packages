require("./runApps")("dev").catch((error) => {
  console.error(error.message || "An app failed.");
  process.exitCode = 1;
});
