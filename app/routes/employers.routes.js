const controller = require("../controllers/employer.controller");
const controller2 = require("../controllers/jobs.controllers");

const { verifyCompany } = require("../middlewares");

module.exports = function(app){
    app.use(function(req, res, next) {
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
    
      app.post("/api/employer/signin", controller.companysignin);
      app.post("/api/employer/createjobpost", controller2.create_job)
      // app.get("/api/employer/getalljobs", controller2.findalljobs)

}
