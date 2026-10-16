require("module-alias/register");
const path = require("path");
const fs = require("fs/promises");
const concurrently = require("concurrently");
const { root, apps } = require("../config/paths");
const getAppsNames = require("../helpers/getAppsNames");
const getAppEnvironment = require("../helpers/getAppEnvironment");
const validateAppNames = require("../generators/validateAppNames");
const { generateAliases } = require("../generators");
const shellQuote = (value) => `'${value.replace(/'/g, "'\\''")}'`;

module.exports = async (action) => {
  if (!["dev", "build", "start"].includes(action)) {
    throw new Error(`Unsupported action ${action}.`);
  }
  if (action !== "start") await generateAliases();
  const available = await getAppsNames();
  const names = process.argv.slice(3);
  const projects = names.length ? names : available;
  validateAppNames(projects);
  const commands = [];
  for (const project of projects) {
    if (!available.includes(project)) throw new Error(`App ${project} does not exist.`);
    const appPath = path.join(apps, project);
    const config = require(path.join(appPath, "app.config.js")).default;
    const type = config.type ?? "spa";
    let entry;
    let cwd = root;
    if (action === "start") {
      const buildFile = {
        api: path.join(appPath, "build/server.js"),
        ssr: path.join(appPath, "build/server/server.js"),
        spa: path.join(appPath, "build/index.html"),
      }[type];
      if (!buildFile) throw new Error(`Unsupported app type ${type} for ${action}.`);
      try {
        if (!(await fs.stat(buildFile)).isFile()) throw new Error("not a file");
        if (type === "ssr") {
          await fs.access(path.join(appPath, "build/client/loadable-stats.json"));
        }
      } catch (error) {
        throw new Error(
          `Build missing or incomplete for ${project}. Run npm run build -- ${project} first.`,
          { cause: error },
        );
      }
      entry = type === "spa"
        ? path.join(root, "core/engine/runtime/commons/launchSpaServer.js")
        : buildFile;
      cwd = type === "ssr" ? path.join(appPath, "build") : appPath;
    } else {
      const script = {
        dev: { ssr: "runtime/commons/launchServer.js", api: "runtime/commons/launchApiServer.js" },
        build: { ssr: "build/buildSsr.js", api: "build/buildApi.js" },
      }[action][type];
      if (!script) throw new Error(`Unsupported app type ${type} for ${action}.`);
      entry = path.join(root, "core/engine", script);
    }
    commands.push({
      command: `exec ${shellQuote(process.execPath)} ${shellQuote(entry)}`,
      cwd,
      name: config.name ?? project,
      prefixColor: config.prefixColor ?? "greenBright",
      env: { ...getAppEnvironment(appPath, config), NODE_ENV: action === "dev" ? "development" : "production" },
    });
  }
  if (commands.length) await concurrently(commands, { killOthersOn: ["failure"], raw: true }).result;
};
