//Authorization using Get method
const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
  

  
  app.get("/api/auth/allusers", controller.findAllusers);
  app.get("/api/auth/userbyid", controller.findUserById)
  app.put("/api/auth/update", controller.updateUser)
  app.delete("/api/auth/deleteuser", controller.deleteOneUser)

};
