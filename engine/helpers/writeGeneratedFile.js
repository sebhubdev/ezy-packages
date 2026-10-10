const fs = require("fs/promises");
const path = require("path");

const writeGeneratedFile = async (filename, content) => {
  let mode;
  try {
    const previous = await fs.readFile(filename, "utf8");
    if (previous === content) return false;
    mode = (await fs.stat(filename)).mode & 0o777;
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw new Error(
        `Cannot read generated file ${filename}: ${error.message}`,
        { cause: error },
      );
    }
  }

  let temporaryDirectory;
  try {
    await fs.mkdir(path.dirname(filename), { recursive: true });
    temporaryDirectory = await fs.mkdtemp(
      path.join(path.dirname(filename), `.${path.basename(filename)}-`),
    );
    const temporaryFile = path.join(
      temporaryDirectory,
      path.basename(filename),
    );
    await fs.writeFile(temporaryFile, content, { encoding: "utf8", mode });
    await fs.rename(temporaryFile, filename);
    return true;
  } catch (error) {
    throw new Error(
      `Cannot write generated file ${filename}: ${error.message}`,
      { cause: error },
    );
  } finally {
    if (temporaryDirectory)
      await fs.rm(temporaryDirectory, { recursive: true, force: true });
  }
};

module.exports = writeGeneratedFile;
