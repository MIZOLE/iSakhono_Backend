const mongoose = require("mongoose");

const employer = mongoose.model(
  "employer",
  new mongoose.Schema({
    companyname: String,
    location: String,
    company_email: String,
    password: String,    
  })
);

module.exports = employer;