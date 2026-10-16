const fs = require("fs/promises");
const path = require("path");
const babel = require("@babel/core");
const dotenv = require("dotenv");
const { root } = require("../../config/paths");
const validateAppNames = require("../../generators/validateAppNames");
const generateAliases = require("../../generators/generateAliases");
const writeGeneratedFile = require("../../generators/utils/writeGeneratedFile");

const parseConfig = (source) => {
  const ast = babel.parseSync(source, { sourceType: "module", configFile: false, babelrc: false });
  const object = ast.program.body.find((node) => node.type === "ExportDefaultDeclaration")?.declaration;
  if (object?.type !== "ObjectExpression") throw new Error("app.config.js must export a configuration object directly.");
  return object;
};
const property = (object, key) => object.properties.find((node) =>
  node.type === "ObjectProperty" && !node.computed && (node.key.name || node.key.value) === key,
)?.value;
const configureTemplate = (source, name, port) => {
  const object = parseConfig(source);
  const edits = [[property(object, "name"), name], [property(object, "type"), "ssr"], [property(object, "port"), port]];
  const document = property(object, "document");
  if (document?.type === "ObjectExpression" && property(document, "title")) {
    edits.push([property(document, "title"), name]);
  }
  if (edits.some(([node]) => !node)) throw new Error("SSR template is missing name, type or port.");
  for (const [node, value] of edits.sort(([a], [b]) => b.start - a.start)) {
    source = source.slice(0, node.start) + JSON.stringify(value) + source.slice(node.end);
  }
  return source;
};
const exists = async (filename) => {
  try { await fs.lstat(filename); return true; }
  catch (error) { if (error.code === "ENOENT") return false; throw error; }
};

const createApp = async (name, { type, port, projectRoot = root, generate = generateAliases } = {}) => {
  validateAppNames([name]);
  if (type !== "ssr") throw new Error("Specify --type ssr. Only the SSR template is available for now.");
  if (port !== undefined && (!Number.isInteger(port) || port < 1 || port > 65535)) {
    throw new Error("Port must be an integer between 1 and 65535.");
  }
  const appsDirectory = path.join(projectRoot, "apps");
  await fs.mkdir(appsDirectory, { recursive: true });
  const entries = await fs.readdir(appsDirectory);
  if (entries.some((entry) => entry.toLowerCase() === name.toLowerCase())) {
    throw new Error(`Destination for app ${JSON.stringify(name)} already exists.`);
  }
  const template = path.join(__dirname, "../../templates/apps", type);
  const configSource = await fs.readFile(path.join(template, "app.config.js"), "utf8");
  const usedPorts = new Set();
  const snapshotPaths = [path.join(projectRoot, "jsconfig.json"), path.join(projectRoot, ".ezycore/appsAliases.js")];
  for (const entry of entries) {
    const appPath = path.join(appsDirectory, entry);
    const configPath = path.join(appPath, "app.config.js");
    if (!(await fs.stat(appPath)).isDirectory() || !(await exists(configPath))) continue;
    snapshotPaths.push(path.join(appPath, "jsconfig.json"));
    if (port === undefined) {
      const configPort = property(parseConfig(await fs.readFile(configPath, "utf8")), "port");
      if (["NumericLiteral", "StringLiteral"].includes(configPort?.type)) usedPorts.add(Number(configPort.value));
      const envPath = path.join(appPath, ".env");
      if (await exists(envPath)) usedPorts.add(Number(dotenv.parse(await fs.readFile(envPath)).PORT));
    }
  }
  if (port === undefined) {
    port = Number(property(parseConfig(configSource), "port")?.value) || 3000;
    while (usedPorts.has(port)) port++;
    if (port > 65535) throw new Error("No available app port. Specify --port.");
  }
  const snapshots = await Promise.all(snapshotPaths.map(async (filename) => ({
    filename, content: await exists(filename) ? await fs.readFile(filename, "utf8") : null,
  })));
  const appPath = path.join(appsDirectory, name);
  // Exclusive mkdir reserves the destination; never overwrite an existing app.
  await fs.mkdir(appPath);
  try {
    await fs.cp(template, appPath, { recursive: true, force: false, errorOnExist: true });
    const packagePath = path.join(appPath, "package.json");
    const manifest = JSON.parse(await fs.readFile(packagePath, "utf8"));
    manifest.name = name;
    await fs.writeFile(packagePath, `${JSON.stringify(manifest, null, 2)}\n`);
    await fs.writeFile(path.join(appPath, "app.config.js"), configureTemplate(configSource, name, port));
    await fs.copyFile(path.join(appPath, ".env.sample"), path.join(appPath, ".env"));
    await generate();
    return { name, type, port, appPath };
  } catch (error) {
    await fs.rm(appPath, { recursive: true, force: true });
    for (const { filename, content } of snapshots) {
      if (content === null) await fs.rm(filename, { force: true });
      else await writeGeneratedFile(filename, content);
    }
    throw error;
  }
};

module.exports = createApp;
