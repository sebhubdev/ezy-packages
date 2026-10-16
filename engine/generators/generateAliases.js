require("module-alias/register");
const highlightMessage = require("@ezycore/shared/utils/highlightMessage");
const { root } = require("@ezycore/engine/config/paths");
const writeGeneratedFile = require("./utils/writeGeneratedFile");
const { getAppsNames } = require("@ezycore/engine/cli/utils");

const path = require("path");
const generateJsConfigs = require("./generateJsConfigs");
const validateAppNames = require("./validateAppNames");

const generateAliases = async () => {
  highlightMessage("info", "Generating aliases");
  const projects = (await getAppsNames()).sort();
  validateAppNames(projects);
  const appsAliases = Object.fromEntries(
    projects.map((project) => [
      `@${project}`,
      path.join(root, "apps", project, "src"),
    ]),
  );

  const destFile = path.resolve(root, ".ezycore/appsAliases.js");

  const aliases = projects
    .map((project) => {
      return `${JSON.stringify(`@${project}`)}: path.resolve(root, ${JSON.stringify(`apps/${project}/src/`)})`;
    })
    .join(",\n  ");

  const appsAliasesContent = `const path = require("path");
const { root } = require("../core/engine/config/paths");

module.exports = {
${aliases ? `  ${aliases},\n` : ""}};
`;

  await generateJsConfigs(projects, appsAliases);
  await writeGeneratedFile(destFile, appsAliasesContent);

  highlightMessage("success", "Aliases and jsconfig files generated !");
};

module.exports = generateAliases;
