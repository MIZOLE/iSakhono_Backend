const mongoose = require("mongoose");

const Jobs = mongoose.model(
  "Jobs",
  new mongoose.Schema({
    jobtile: String,
    companyid: String,
    location: String,
    work_type: String,
    job_description: String,
  })
);

module.exports = Jobs;