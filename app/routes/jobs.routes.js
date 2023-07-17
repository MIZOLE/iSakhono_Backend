// module.exports = function (app) {

    const controller = require("../controllers/jobs.controller");
    const { authJwt } = require("../middlewares");
    
    
    module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/jobs",[authJwt.verifyToken], controller.create_job);
    app.delete("/api/jobs/:companyid/:id", [authJwt.verifyToken, authJwt.verifyCompany], controller.deleteajob)
    app.put("/api/jobs/:companyid/:id", [authJwt.verifyToken, authJwt.verifyCompany], controller.updateajobpost)
    app.get("/api/jobs/:id", controller.findOne)
    app.get("/api/jobs/company/:companyid", [authJwt.verifyToken], controller.onlyGetSpecificCompanypost)
    app.get("/api/jobs/", [authJwt.verifyToken], controller.findAlljobs)
    }