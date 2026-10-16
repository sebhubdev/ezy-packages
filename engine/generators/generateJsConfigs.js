const fs = require("fs/promises");
const path = require("path");
const JSON5 = require("json5");
const { root } = require("../config/paths");
const createAliases = require("../config/aliases");
const writeGeneratedFile = require("../helpers/writeGeneratedFile");

const toPaths = (aliases, basePath) =>
  Object.fromEntries(
    Object.entries(aliases).map(([name, targets]) => [
      `${name}/*`,
      (Array.isArray(targets) ? targets : [targets]).map((target) => {
        const relative = path
          .relative(basePath, target)
          .split(path.sep)
          .join("/");
        return relative ? `${relative}/*` : "*";
      }),
    ]),
  );

const prepareConfig = async (directory, aliases, defaults) => {
  const filename = path.join(directory, "jsconfig.json");
  let config = {};
  let previous;
  try {
    previous = await fs.readFile(filename, "utf8");
    config = JSON5.parse(previous);
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw new Error(`Cannot read ${filename}: ${error.message}`);
    }
  }

  const compilerOptions = config.compilerOptions || {};
  const baseUrl = compilerOptions.baseUrl ?? ".";
  const basePath = path.resolve(directory, baseUrl);
  const result = {
    ...defaults,
    ...config,
    compilerOptions: {
      ...compilerOptions,
      baseUrl,
      paths: {
        ...compilerOptions.paths,
        ...toPaths(aliases, basePath),
      },
    },
  };
  const content = `${JSON.stringify(result, null, 2)}\n`;
  return { filename, content };
};

const generateJsConfigs = async (projects, appsAliases) => {
  const coreAliases = Object.fromEntries(
    Object.entries(createAliases(root)).map(([name, targets]) => [
      name,
      Array.isArray(targets) ? targets[targets.length - 1] : targets,
    ]),
  );
  const configs = [
    await prepareConfig(
      root,
      { ...appsAliases, ...coreAliases },
      {
        include: ["core"],
        exclude: ["node_modules", "**/build", "**/dist"],
      },
    ),
  ];

  for (const project of projects) {
    const appPath = path.join(root, "apps", project);
    configs.push(
      await prepareConfig(
        appPath,
        { ...appsAliases, ...createAliases(appPath) },
        {
          include: ["src", "server", "*.js"],
          exclude: ["node_modules", "build", "dist"],
        },
      ),
    );
  }
  for (const { filename, content } of configs) {
    await writeGeneratedFile(filename, content);
  }
};

module.exports = generateJsConfigs;
