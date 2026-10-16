require("module-alias/register");
const createApp = require("../actions/createApp");
const highlightMessage = require("@ezycore/shared/utils/highlightMessage");
const args = process.argv.slice(3);

(async () => {
  const usage = "Usage: npm run ezy:create-app -- <name> --type ssr [--port 3001]";
  const [name, ...flags] = args;
  if (!name || name.startsWith("--")) throw new Error(usage);
  const options = {};
  for (let index = 0; index < flags.length; index += 2) {
    const key = flags[index];
    const value = flags[index + 1];
    if (!["--type", "--port"].includes(key) || !value || value.startsWith("--") || key.slice(2) in options) {
      throw new Error(usage);
    }
    options[key.slice(2)] = key === "--port" ? Number(value) : value;
  }
  const result = await createApp(name, options);
  await highlightMessage("success", `Created ${result.name} (${result.type}) in apps/${result.name}, port ${result.port}.`);
  await highlightMessage("info", `Run npm install to link the workspace, then npm run dev -- ${result.name}.`);
})().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
