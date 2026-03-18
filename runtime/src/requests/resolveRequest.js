import normalizeResponse from "@ezycore/runtime/src/requests/normalizeResponse";
import normalizeError from "@ezycore/runtime/src/errors/normalizeError";

const resolveRequest = async (request, expectedType) => {
  try {
    const result = await request;
    return normalizeResponse(result, expectedType);
  } catch (err) {
    return normalizeError(err);
  }
};

export default resolveRequest;
