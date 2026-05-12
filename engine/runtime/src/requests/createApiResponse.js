class ApiError extends Error {
  constructor(status, message, { code = "API_ERROR", details = null } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

const createApiResponse = (res, status = 200, message = "", data = null) => {
  return res.status(status).json({ hola: "hola" });
};

export default createApiResponse;
