const { root } = require("../config/paths");
const createAliases = require("../config/aliases");

const validateAppNames = (projects) => {
  const reservedAliases = new Set(Object.keys(createAliases(root)));

  for (const project of projects) {
    if (typeof project !== "string" || !/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(project)) {
      throw new Error(
        `Invalid app name ${JSON.stringify(project)}: start with a letter and use only letters, numbers, hyphens or underscores.`,
      );
    }

    const alias = `@${project}`;
    if (reservedAliases.has(alias)) {
      throw new Error(
        `Cannot generate aliases for app ${JSON.stringify(project)}: ${alias} is reserved by the core. Rename the app directory.`,
      );
    }
  }
};

module.exports = validateAppNames;
