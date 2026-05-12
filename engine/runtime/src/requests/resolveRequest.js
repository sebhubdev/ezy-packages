import normalizeResponse from "@ezycore/engine/runtime/src/requests/normalizeResponse";
import normalizeError from "@ezycore/engine/runtime/src/errors/normalizeError";

const resolveRequest = async (request, expectedType) => {
  try {
    const result = await request;
    return normalizeResponse(result, expectedType);
  } catch (err) {
    return normalizeError(err);
  }
};

export default resolveRequest;
