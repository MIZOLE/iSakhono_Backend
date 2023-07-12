// module.exports = function (app) {

    const controller = require("../controllers/jobs.controller");
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
    app.delete("/api/:companyid/:id", [authJwt.verifyToken, authJwt.verifyCompany], controller.deleteajob)
    app.put("/api/:companyid/:id", [authJwt.verifyToken, authJwt.verifyCompany], controller.updateajobpost)
    app.get("/api/jobs/:companyid", [authJwt.verifyToken, authJwt.verifyCompany], controller.onlyGetSpecificCompanypost)
    app.get("/api/jobs/", [authJwt.verifyToken], controller.findAlljobs)

    // app.get("/api/employer/speccompany", [authJwt.check_specjob_post, authJwt.verifyCompanybeforeupdate], controller2.onlygetspecificcompanypost)

    }