import cleanErrorMessage from "@ezycore/runtime/src/errors/cleanErrorMessage";

const normalizeError = (err) => {
  const rawMessage =
    err?.message || err?.response?.data?.message || "Unknown error";

  return {
    status: err?.status || err?.response?.status || 500,
    data: null,
    error: {
      message: cleanErrorMessage(rawMessage),
      code: err?.code || err?.response?.data?.code || null,
    },
  };
};

export default normalizeError;
