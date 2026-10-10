import normalizeResponse from "./normalizeResponse";
import normalizeError from "../errors/normalizeError";

const resolveLoader = async (loader, context = {}) => {
  try {
    return normalizeResponse(loader ? await loader(context) : null);
  } catch (error) {
    return normalizeError(error);
  }
};

export default resolveLoader;
