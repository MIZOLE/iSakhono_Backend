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
  

  
  app.get("/api/users", controller.findAllusers);
  app.get("/api/users/:id", controller.findUserById)
  app.put("/api/users/:id", controller.updateUser)
  app.delete("/api/users/:id", controller.deleteOneUser)

};
