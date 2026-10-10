const router = require("express").Router();
const auth = require("../../middlewares/auth.js");
const userController = require("../User/user.controller.js");

module.exports = (app) => {
  router.get("/me/", auth.byToken, userController.me);
  router.post("/login/", userController.login);

  app.use("/api/v1/", router);
};
