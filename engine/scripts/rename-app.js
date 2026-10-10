require("module-alias/register");
const renameApp = require("../cli/renameApp");
const highlightMessage = require("@ezycore/shared/utils/highlightMessage");
const args = process.argv.slice(3);

(async () => {
  if (args.length !== 2)
    throw new Error("Usage: npm run ezy:rename-app -- old-name new-name");
  const result = await renameApp(...args);
  highlightMessage(
    "success",
    `App ${result.oldName} renamed to ${result.newName}. Aliases regenerated.`,
  );
  highlightMessage(
    "info",
    "Run npm install to refresh workspace links, then rebuild the renamed app before starting it.",
  );
})().catch((error) => {
  highlightMessage("error", error.message);
  process.exitCode = 1;
});
