const db = require("../models")
const employer = db.employer


const checkForCompanyDuplicates = async (req, res, next) => {
    try {
      // Check duplicate username
      const companyname = await employer.findOne({ companyname: req.body.companyname }).exec();
      if (companyname) {
        return res.status(400).send({ message: "Failed! Username is already in use!" });
      }
  
      // Check duplicate email
      let emp_email = await employer.findOne({ company_email: req.body.company_email }).exec();
      if (emp_email) {
        return res.status(400).send({ message: "Failed! Email is already in use!" });
      }
  
      next();
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  };


  const verifyCompany = {
    checkForCompanyDuplicates
  };
  
  module.exports = verifyCompany;
  