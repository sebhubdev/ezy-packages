import menu from "./fixtures/global/menu";
import custom from "./fixtures/global/custom";
import local from "./fixtures/global/local";

const getGlobalData = async (currentLang) => {
  const globalData = { menu, custom, local };

  return globalData;
};

export default getGlobalData;
