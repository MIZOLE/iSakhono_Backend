const controller = require("../controllers/jobs.controllers");
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


    app.post("/api/employer/createjobpost", [authJwt.verifyToken], controller.create_job);
    app.delete("/api/:companyid/:id", [authJwt.verifyToken, authJwt.verifyCompanybeforedelete], controller.deleteajob)
    app.put("/api/:companyid/:id", [authJwt.verifyToken, authJwt.verifyCompanybeforeupdate], controller.updateajobpost)
    app.get("/api/employer/findspec/:id", [authJwt.verifyToken, authJwt.check_specjob_post], controller.onlygetspecificcompanypost)
    app.get("/api/employer/findalljobs", controller.findAlljobs)

    // app.get("/api/employer/speccompany", [authJwt.check_specjob_post, authJwt.verifyCompanybeforeupdate], controller2.onlygetspecificcompanypost)
}





