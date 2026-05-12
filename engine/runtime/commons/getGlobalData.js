import menu from "@ezycore/engine/runtime/data/fakeData/global/menu";
import custom from "@ezycore/engine/runtime/data/fakeData/global/custom";
import local from "@ezycore/engine/runtime/data/fakeData/global/local";

const getGlobalData = async (currentLang) => {
  const globalData = { menu, custom, local };

  return globalData;
};

export default getGlobalData;
