require("module-alias/register");
const highlightMessage = require("@ezycore/shared/utils/highlightMessage");
const { root } = require("@ezycore/engine/config/paths");
const fsPromises = require("fs/promises");
const { getAppsNames } = require("@ezycore/engine/helpers");

const path = require("path");

const generateAliases = async () => {
  highlightMessage("info", "Generating aliases");
  const projects = await getAppsNames();

  const destFile = path.resolve(root, "packages/engine/config/appsAliases.js");

  const aliases = projects
    .map((project) => {
      return `"@${project}": path.resolve(root, 'apps/${project}/src/')`;
    })
    .join(",\n\t\t");

  let appsAliasesContent = `const path = require("path");
const { root } = require("./paths");

module.exports = {
    ${aliases}        
};
  `;

  await fsPromises.writeFile(destFile, appsAliasesContent);

  highlightMessage("success", "Aliases generated !");
};

module.exports = generateAliases;
