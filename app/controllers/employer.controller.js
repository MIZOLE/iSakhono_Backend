const db = require("../models");
const config = require("../config/auth.config");
const employer = db.employer;
const bcrypt = require('bcrypt');
var jwt = require("jsonwebtoken");

exports.company_signup = async (req, res) => {
  if (!req.body.companyname) {
    res.send({ message: "Can't create company profile with empty name" })
    return
  }
  const companyname = await employer.findOne({ companyname: req.body.companyname }).exec();
  if (companyname) {
    return res.status(400).send({ message: "Failed! Company name already exist!" });
  }
  const company = new employer({
    companyname: req.body.companyname,
    location: req.body.location,
    company_email: req.body.company_email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  company.save().then(() => {
    res.status(200).send({ message: "Register was a success!" })
  })
}

exports.companysignin = (req, res) => {
  employer.findOne({ companyname: req.body.companyname })
    .then(company => {
      console.log(company)
      if (!company) {
        return res.status(404).send({ message: "Company does not exists." });
      }

      var employerpasswordIsValid = bcrypt.compareSync(req.body.password, company.password);
      console.log(employerpasswordIsValid)

      if (!employerpasswordIsValid) {
        return res.status(401).send({ message: "Invalid Password!" });
      }

      var token = jwt.sign({ id: company.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      req.session.token = token;

      res.status(200).send({
        id: company._id,
        companyname: company.companyname,
        company_email: company.company_email,
        token: token,
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


