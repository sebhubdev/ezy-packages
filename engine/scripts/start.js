require("module-alias/register");
const concurrently = require("concurrently");
const fs = require("fs/promises");
const path = require("path");
const dotenv = require("dotenv");
const { root, apps: appsDir } = require("../config/paths");
const getAppsNames = require("../helpers/getAppsNames");
const validateAppNames = require("../generators/validateAppNames");
const highlightMessage = require("@ezycore/shared/utils/highlightMessage");

const shellQuote = (value) => `'${value.replace(/'/g, "'\\''")}'`;

const execute = async () => {
  const available = await getAppsNames();
  const args = process.argv.slice(3);
  const projects = args.length ? args : available;
  validateAppNames(projects);
  if (!projects.length) {
    highlightMessage("info", "No apps to start.");
    return;
  }

  const commands = [];
  for (const project of projects) {
    if (!available.includes(project))
      throw new Error(`App ${JSON.stringify(project)} does not exist.`);
    const appPath = path.join(appsDir, project);
    const config = require(path.join(appPath, "app.config.js")).default;
    const type = config.type ?? "spa";
    let appEnv = {};
    try {
      appEnv = dotenv.parse(await fs.readFile(path.join(appPath, ".env")));
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
    const buildFile = {
      api: path.join(appPath, "build/server.js"),
      ssr: path.join(appPath, "build/server/server.js"),
      spa: path.join(appPath, "build/index.html"),
    }[type];
    if (!buildFile)
      throw new Error(
        `Unsupported app type ${JSON.stringify(type)} for ${project}.`,
      );
    try {
      if (!(await fs.stat(buildFile)).isFile()) throw new Error("not a file");
      if (type === "ssr")
        await fs.access(path.join(appPath, "build/client/loadable-stats.json"));
    } catch (error) {
      throw new Error(
        `Build missing or incomplete for ${project}. Run npm run build -- ${project} first.`,
        { cause: error },
      );
    }
    const entry =
      type === "spa"
        ? path.join(root, "packages/engine/runtime/commons/launchSpaServer.js")
        : buildFile;
    commands.push({
      command: `exec ${shellQuote(process.execPath)} ${shellQuote(entry)}`,
      cwd: type === "ssr" ? path.join(appPath, "build") : appPath,
      name: config.name ?? project,
      prefixColor: config.prefixColor ?? "greenBright",
      env: {
        ...process.env,
        ...appEnv,
        ...(appEnv.PORT || !config.port ? {} : { PORT: String(config.port) }),
        NODE_ENV: "production",
        APP_PATH: appPath,
        APP_NAME: config.name ?? project,
        APP_TYPE: type,
      },
    });
  }
  highlightMessage("info", `Starting builds: ${projects.join(", ")}`);
  const { result } = concurrently(commands, { killOthersOn: ["failure"] });
  await result;
};

execute().catch((error) => {
  highlightMessage("error", error.message || "An app failed to start.");
  process.exitCode = 1;
});
