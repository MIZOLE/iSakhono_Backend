const controller = require("../controllers/employer.controller");
const { authJwt } = require("../middlewares");

const { verifyCompany } = require("../middlewares");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/company/signup",
    [
      verifyCompany.checkForCompanyDuplicates,
    ],
    controller.company_signup
  );

  app.post("/api/company/signin", controller.companysignin);
  app.put("/api/employers/:id", [authJwt.verifyToken, authJwt.verifyCompany], controller.updatecompanyprofile)
  app.get("/api/employer/:id", [authJwt.verifyToken], controller.getcompanybyid)
  app.get("/api/company/", [authJwt.verifyToken], controller.findAll)
  app.delete("api/employer/:id", [authJwt.verifyToken, authJwt.verifyCompany], controller.deletecompany)
  
}
