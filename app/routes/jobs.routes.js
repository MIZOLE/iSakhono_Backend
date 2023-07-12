// module.exports = function (app) {

    const controller = require("../controllers/jobs.controller");
    const { authJwt } = require("../middlewares");
    const { verifyCompany } = require("../middlewares");
    const cors = require("cors")
    
    module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.use(cors())//enable cors for all routes
    
    app.post("/api/job/createjob", controller.create_job);
    app.delete("/api/:companyid/:id", [authJwt.verifyToken, authJwt.verifyCompany], controller.deleteajob)
    app.put("/api/:companyid/:id", [authJwt.verifyToken, authJwt.verifyCompany], controller.updateajobpost)
    app.get("/api/jobs/:companyid", [authJwt.verifyToken, authJwt.verifyCompany], controller.onlyGetSpecificCompanypost)
    app.get("/api/jobs/", [authJwt.verifyToken], controller.findAlljobs)
    }