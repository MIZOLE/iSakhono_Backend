//Authenitication testing routes using post
const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      // verifySignUp.checkDuplicateUsernameOrEmail,
      // verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
  app.post("/api/auth/signout", controller.signout);
  app.get("/api/auth/allusers", controller.findAllusers);
  app.get("/api/auth/userbyid", controller.findUserById)
  app.put("/api/auth/update", controller.updateUser)
  app.delete("/api/auth/deleteuser", controller.deleteOneUser)

};