import menu from "@ezycore/api/fixtures/global/menu";
import custom from "@ezycore/api/fixtures/global/custom";
import local from "@ezycore/api/fixtures/global/local";

const getGlobalData = async (currentLang) => {
  const globalData = { menu, custom, local };

  return globalData;
};

export default getGlobalData;
