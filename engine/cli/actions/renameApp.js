const fs = require("fs/promises");
const path = require("path");
const babel = require("@babel/core");
const { root } = require("../../config/paths");
const getAppsNames = require("../utils/getAppsNames");
const validateAppNames = require("../../generators/validateAppNames");
const writeGeneratedFile = require("../../generators/utils/writeGeneratedFile");
const generateAliases = require("../../generators/generateAliases");

const ignored = new Set([
  "node_modules",
  ".git",
  "build",
  "dist",
  ".aws",
  ".agents",
  ".codex",
]);
const textFile =
  /\.(?:[cm]?jsx?|tsx?|json|jsonc|scss|sass|css|html|md|ya?ml|env|sample)$/;
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const collectFiles = async (directory) => {
  const files = [];
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    if (ignored.has(entry.name) || entry.isSymbolicLink()) continue;
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await collectFiles(filename)));
    else if (
      entry.isFile() &&
      (textFile.test(entry.name) || entry.name.startsWith(".env"))
    )
      files.push(filename);
  }
  return files;
};

const setConfigName = (source, name) => {
  const ast = babel.parseSync(source, {
    sourceType: "module",
    configFile: false,
    babelrc: false,
  });
  const object = ast.program.body.find(
    (node) => node.type === "ExportDefaultDeclaration",
  )?.declaration;
  if (object?.type !== "ObjectExpression") {
    throw new Error(
      "Cannot rename app: app.config.js must export a configuration object directly.",
    );
  }
  const property = object.properties.find(
    (node) =>
      node.type === "ObjectProperty" &&
      (node.key.name || node.key.value) === "name",
  );
  if (!property)
    return (
      source.slice(0, object.start + 1) +
      `\n  name: ${JSON.stringify(name)},` +
      source.slice(object.start + 1)
    );
  if (property.value.type !== "StringLiteral" || property.computed) {
    throw new Error(
      "Cannot rename app: app.config.js name must be a string literal.",
    );
  }
  return (
    source.slice(0, property.value.start) +
    JSON.stringify(name) +
    source.slice(property.value.end)
  );
};

const renameApp = async (
  oldName,
  newName,
  { projectRoot = root, generate = generateAliases } = {},
) => {
  validateAppNames([oldName, newName]);
  if (oldName === newName)
    throw new Error("The new app name must be different.");
  const appsDirectory = path.join(projectRoot, "apps");
  const apps = await getAppsNames(appsDirectory);
  if (!apps.includes(oldName))
    throw new Error(`App ${JSON.stringify(oldName)} does not exist.`);
  if (
    apps.some(
      (name) =>
        name !== oldName && name.toLowerCase() === newName.toLowerCase(),
    )
  ) {
    throw new Error(`An app named ${JSON.stringify(newName)} already exists.`);
  }
  const oldPath = path.join(appsDirectory, oldName);
  const newPath = path.join(appsDirectory, newName);
  try {
    await fs.lstat(newPath);
    throw new Error(`Destination ${newPath} already exists.`);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }

  const snapshots = new Map();
  const changes = new Map();
  const escaped = escapeRegExp(oldName);
  const alias = new RegExp(`(?<![\\w@.-])@${escaped}(?=[/\\s"'\x60*]|$)`, "g");
  const appRoute = new RegExp(
    `(?<![\\w-])apps/${escaped}(?=[/\\s"'\x60*]|$)`,
    "g",
  );
  const cliArgument = new RegExp(
    `(npm\\s+run\\s+(?:dev|build|start)\\s+(?:--\\s+)?)${escaped}(?=[\\s"'\x60]|$)`,
    "g",
  );
  const relativeRoute = new RegExp(`(\\.\\./)${escaped}(?=/)`, "g");
  const packageFile = path.join(oldPath, "package.json");
  const manifest = JSON.parse(await fs.readFile(packageFile, "utf8"));
  const oldPackageName = manifest.name;
  for (const app of apps.filter((name) => name !== oldName)) {
    const other = JSON.parse(
      await fs.readFile(path.join(appsDirectory, app, "package.json"), "utf8"),
    );
    if (other.name === newName)
      throw new Error(
        `Workspace package name ${JSON.stringify(newName)} already exists.`,
      );
  }
  for (const filename of await collectFiles(projectRoot)) {
    const source = await fs.readFile(filename, "utf8");
    snapshots.set(filename, source);
    let updated = source
      .replace(alias, `@${newName}`)
      .replace(appRoute, `apps/${newName}`)
      .replace(relativeRoute, `$1${newName}`)
      .replace(cliArgument, `$1${newName}`);
    if (filename === path.join(oldPath, "app.config.js"))
      updated = setConfigName(updated, newName);
    if (path.basename(filename) === "package.json") {
      const pkg = JSON.parse(updated);
      let changed = filename === packageFile;
      if (changed) pkg.name = newName;
      for (const section of [
        "dependencies",
        "devDependencies",
        "peerDependencies",
        "optionalDependencies",
      ]) {
        if (
          oldPackageName !== newName &&
          pkg[section] &&
          Object.hasOwn(pkg[section], oldPackageName)
        ) {
          if (Object.hasOwn(pkg[section], newName))
            throw new Error(
              `Dependency ${newName} already exists in ${filename}.`,
            );
          pkg[section][newName] = pkg[section][oldPackageName];
          delete pkg[section][oldPackageName];
          changed = true;
        }
      }
      if (changed) updated = JSON.stringify(pkg, null, 2) + "\n";
    }
    if (path.basename(filename) === "package-lock.json") {
      const lock = JSON.parse(updated);
      if (lock.lockfileVersion !== 3)
        throw new Error(
          `Unsupported lockfile format in ${filename}; expected version 3.`,
        );
      for (const pkg of Object.values(lock.packages || {})) {
        if (pkg.name === oldPackageName) pkg.name = newName;
        for (const section of [
          "dependencies",
          "devDependencies",
          "peerDependencies",
          "optionalDependencies",
        ]) {
          if (pkg[section] && Object.hasOwn(pkg[section], oldPackageName)) {
            if (Object.hasOwn(pkg[section], newName))
              throw new Error(
                `Dependency ${newName} already exists in ${filename}.`,
              );
            pkg[section][newName] = pkg[section][oldPackageName];
            delete pkg[section][oldPackageName];
          }
        }
      }
      const oldLink = `node_modules/${oldPackageName}`;
      if (
        lock.packages?.[oldLink]?.link &&
        lock.packages[oldLink].resolved === `apps/${newName}`
      ) {
        if (lock.packages[`node_modules/${newName}`])
          throw new Error(`Package ${newName} already exists in the lockfile.`);
        lock.packages[`node_modules/${newName}`] = lock.packages[oldLink];
        delete lock.packages[oldLink];
      }
      updated = JSON.stringify(lock, null, 2) + "\n";
    }
    if (updated !== source) changes.set(filename, updated);
  }

  // Include generated files that may not exist yet in the rollback snapshot.
  for (const filename of [
    path.join(projectRoot, ".ezycore/appsAliases.js"),
    path.join(projectRoot, "jsconfig.json"),
    ...apps.map((name) => path.join(appsDirectory, name, "jsconfig.json")),
  ]) {
    if (!snapshots.has(filename)) snapshots.set(filename, null);
  }
  let moved = false;
  try {
    await fs.rename(oldPath, newPath);
    moved = true;
    for (const [filename, content] of changes) {
      const target = filename.startsWith(oldPath + path.sep)
        ? newPath + filename.slice(oldPath.length)
        : filename;
      await writeGeneratedFile(target, content);
    }
    await generate();
  } catch (error) {
    if (moved) {
      try {
        await fs.rename(newPath, oldPath);
        for (const [filename, content] of snapshots) {
          if (content === null) await fs.rm(filename, { force: true });
          else await writeGeneratedFile(filename, content);
        }
      } catch (rollbackError) {
        throw new Error(
          `Rename failed: ${error.message}. Rollback also failed: ${rollbackError.message}`,
          { cause: error },
        );
      }
    }
    throw error;
  }
  return { oldName, newName, updatedFiles: changes.size };
};

module.exports = renameApp;
