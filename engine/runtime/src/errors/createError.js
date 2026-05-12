const createError = (status, message, code = null, extra = {}) => {
  const err = new Error(message);
  err.status = status;
  err.code = code;
  Object.assign(err, extra);
  throw err;
};

export default createError;
