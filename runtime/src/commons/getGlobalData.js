import menu from "@ezycore/runtime/src/fixtures/global/menu";
import custom from "@ezycore/runtime/src/fixtures/global/custom";
import local from "@ezycore/runtime/src/fixtures/global/local";

const getGlobalData = async (currentLang) => {
  const globalData = { menu, custom, local };

  return globalData;
};

export default getGlobalData;
