const getType = (value) => {
  if (Array.isArray(value)) return "array";
  if (value === null) return "null";
  return typeof value;
};

const normalizeResponse = (response, expectedType = null) => {
  // Si ya viene normalizado
  if (
    response &&
    typeof response === "object" &&
    "status" in response &&
    "data" in response
  ) {
    return {
      status: response.status ?? 200,
      error: response.error ?? null,
      data: response.data,
    };
  }

  let data = response;

  if (expectedType) {
    const realType = getType(data);

    if (realType !== expectedType) {
      const err = new Error(
        `Invalid response type: expected ${expectedType}, got ${realType}`,
      );
      err.status = 500;
      err.code = "INVALID_RESPONSE_TYPE";
      throw err; // 👈 aquí está la clave
    }
  }

  return {
    status: 200,
    error: null,
    data,
  };
};

export default normalizeResponse;
