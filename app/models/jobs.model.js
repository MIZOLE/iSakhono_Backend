const mongoose = require("mongoose");

const Jobs = mongoose.model(
  "Jobs",
  new mongoose.Schema({
    jobtile: String,
    companyname: String,
    location: String,
    work_type: String,
    job_description: String,
  })
);

module.exports = Jobs;