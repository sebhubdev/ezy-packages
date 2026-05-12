import normalizeResponse from "@ezycore/engine/runtime/requests/normalizeResponse";
import normalizeError from "@ezycore/engine/runtime/errors/normalizeError";

const resolveRequest = async (request, expectedType) => {
  try {
    const result = await request;
    return normalizeResponse(result, expectedType);
  } catch (err) {
    return normalizeError(err);
  }
};

export default resolveRequest;
