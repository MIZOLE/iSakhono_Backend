const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");


const verifyToken = (req, res, next) => {
  
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    // req.user = decoded
    next();
  });
};

const verifyUser = (req, res, next) => {
  let id = req.body.id
  if (req.userid != id) {
    return res.status(401).send({ message: "Please edit your own profile!" });
  }
  console.log(req.userId)
  next();
}

const verifyCompany = (req, res, next) => {

  // let companyid = req.body.token
  // console.log(req.user)
  if (req.userId != req.params.companyid) {
    return res.status(401).send({ message: "Please update your own company profile" });
  } 
  next();
}

const check_specjob_post = (req, res, next) => {
  let loggedin_company = req.params.companyid;

  if (req.userId != loggedin_company) {
    return res.status(401).send({ message: "No jobs available from this company" });
  } 
  next();
}

const verifybeforegettingaspecifccompany = (req, res, next) => {
  let loggedin_company = req.params.companyid;

  if (req.userId != loggedin_company) {
    return res.status(401).send({ message: "No jobs available from this company" });
  } 
  next();
}


const authJwt = {
  verifyToken,
  verifyUser,
  verifyCompany,
  // verifyCompanybeforedelete,
  check_specjob_post,
};
module.exports = authJwt;
