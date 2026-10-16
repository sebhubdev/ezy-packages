import menu from "@ezycore/engine/runtime/data/defaults/menu";
import custom from "@ezycore/engine/runtime/data/defaults/custom";
import local from "@ezycore/engine/runtime/data/defaults/local";

const getGlobalData = async (currentLang) => {
  const globalData = { menu, custom, local };

  return globalData;
};

export default getGlobalData;
