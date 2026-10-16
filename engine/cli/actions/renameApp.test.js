const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const os = require("node:os");
const renameApp = require("./renameApp");

const fixture = async (t) => {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), "ezy-rename-"));
  t.after(() => fs.rm(directory, { recursive: true, force: true }));
  const files = {
    "apps/site/app.config.js":
      'export default { type: "ssr", name: "site" };\n',
    "apps/site/package.json": '{"name":"site","version":"1.0.0"}',
    "apps/site/src/index.js":
      'import x from "@site/module"; const unrelated = "@siteExtra"; const mail = "me@site.com";',
    "apps/site/.env": "PORT=3000\nSECRET=unchanged\n",
    "apps/site/jsconfig.json":
      '{"compilerOptions":{"paths":{"@site/*":["src/*"]}}}',
    "apps/other/app.config.js":
      'export default { type: "api", name: "other" };',
    "apps/other/package.json": '{"name":"other","dependencies":{"site":"*"}}',
    "apps/other/src/index.js": 'import x from "@site/module";',
    "apps/other/jsconfig.json":
      '{"compilerOptions":{"paths":{"@site/*":["../site/src/*"]}}}',
    "jsconfig.json":
      '{"compilerOptions":{"paths":{"@site/*":["apps/site/src/*"]}}}',
    ".github/workflows/build.yml":
      "run: npm run build -- site\npath: apps/site/**\n",
    "package-lock.json": JSON.stringify({
      lockfileVersion: 3,
      packages: {
        "apps/site": { name: "site", version: "1.0.0" },
        "apps/other": { dependencies: { site: "*" } },
        "node_modules/site": { resolved: "apps/site", link: true },
      },
    }),
  };
  for (const [filename, text] of Object.entries(files)) {
    await fs.mkdir(path.dirname(path.join(directory, filename)), {
      recursive: true,
    });
    await fs.writeFile(path.join(directory, filename), text);
  }
  return { directory, files };
};

test("renames app and references, preserves unrelated text, and updates workspace lock", async (t) => {
  const { directory } = await fixture(t);
  let generated = false;
  await renameApp("site", "portal", {
    projectRoot: directory,
    generate: async () => {
      generated = true;
    },
  });
  assert(generated);
  await assert.rejects(fs.access(path.join(directory, "apps/site")));
  const read = (file) => fs.readFile(path.join(directory, file), "utf8");
  assert.match(await read("apps/portal/app.config.js"), /name: "portal"/);
  assert.equal(
    JSON.parse(await read("apps/portal/package.json")).name,
    "portal",
  );
  const source = await read("apps/portal/src/index.js");
  assert.match(source, /@portal\/module/);
  assert.match(source, /@siteExtra/);
  assert.match(source, /me@site.com/);
  assert.match(await read("apps/other/src/index.js"), /@portal\/module/);
  assert.match(await read("apps/other/jsconfig.json"), /\.\.\/portal\/src/);
  assert.match(await read(".github/workflows/build.yml"), /build -- portal/);
  assert.equal(await read("apps/portal/.env"), "PORT=3000\nSECRET=unchanged\n");
  const lock = JSON.parse(await read("package-lock.json"));
  assert.equal(lock.packages["apps/portal"].name, "portal");
  assert.equal(lock.packages["node_modules/portal"].resolved, "apps/portal");
  assert.equal(lock.packages["node_modules/site"], undefined);
  assert.equal(lock.packages["apps/other"].dependencies.portal, "*");
});

test("restores original files and removes newly generated files on generation failure", async (t) => {
  const { directory, files } = await fixture(t);
  await assert.rejects(
    renameApp("site", "portal", {
      projectRoot: directory,
      generate: async () => {
        await fs.mkdir(path.join(directory, ".ezycore"), { recursive: true });
        await fs.writeFile(
          path.join(directory, ".ezycore/appsAliases.js"),
          "partial",
        );
        await fs.writeFile(path.join(directory, "jsconfig.json"), "partial");
        throw new Error("generation failed");
      },
    }),
    /generation failed/,
  );
  for (const [filename, text] of Object.entries(files))
    assert.equal(
      await fs.readFile(path.join(directory, filename), "utf8"),
      text,
    );
  await assert.rejects(fs.access(path.join(directory, "apps/portal")));
  await assert.rejects(
    fs.access(path.join(directory, ".ezycore/appsAliases.js")),
  );
});

test("rejects invalid names, missing apps, reserved aliases and occupied destinations", async (t) => {
  const { directory, files } = await fixture(t);
  for (const [oldName, newName] of [
    ["site", "ui"],
    ["site", "bad name"],
    ["missing", "portal"],
    ["site", "other"],
    ["site", "site"],
  ]) {
    await assert.rejects(
      renameApp(oldName, newName, {
        projectRoot: directory,
        generate: async () => {},
      }),
    );
  }
  for (const [filename, text] of Object.entries(files))
    assert.equal(
      await fs.readFile(path.join(directory, filename), "utf8"),
      text,
    );
});
