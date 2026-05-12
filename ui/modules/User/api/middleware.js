const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  byToken: (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
      return res
        .status(403)
        .send({ error: "A token is required for authentication" });
    }
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      req.loggedUserId = decoded.string;
    } catch (err) {
      console.log(error);
      return res.status(401).send({ error: "Invalid Token" });
    }
    return next();
  },
};
