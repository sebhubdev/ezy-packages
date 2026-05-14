require("module-alias/register");
const highlightMessage = require("@ezycore/shared/utils/highlightMessage");
const { generateAliases } = require("@ezycore/engine/generators");

const generate = async () => {
  highlightMessage("info", "Init generate");
  await generateAliases();
  highlightMessage("success", "Generetion complete !");
};

generate();
