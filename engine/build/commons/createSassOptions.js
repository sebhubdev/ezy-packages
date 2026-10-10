const fs = require("fs");
const path = require("path");

const createSassOptions = (appPath) => {
  const options = {
    sourceMap: true,
    api: "modern",
    implementation: require("sass"),
    webpackImporter: true,
  };
  const tokensDirectory = path.resolve(appPath, "src/assets/styles/tokens");
  const tokensFile = path.join(tokensDirectory, "index.scss");
  if (!fs.existsSync(tokensFile)) return options;

  options.additionalData = (content, loaderContext) => {
    const resourcePath = loaderContext.resourcePath;
    if (!/\.s[ac]ss$/.test(resourcePath)) return content;
    const relative = path.relative(tokensDirectory, resourcePath);
    if (!relative.startsWith(`..${path.sep}`) && relative !== ".." && !path.isAbsolute(relative)) {
      return content;
    }
    const url = tokensFile.split(path.sep).join("/");
    // Configure tokens before any component loads them in this compilation.
    const statement = `@use ${JSON.stringify(url)} as ezyAppTokens;`;
    return resourcePath.endsWith(".sass")
      ? `${statement.slice(0, -1)}\n${content}`
      : `${statement}\n${content}`;
  };
  return options;
};

module.exports = createSassOptions;
