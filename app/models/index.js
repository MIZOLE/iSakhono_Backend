const dbConfig = require("../config/db.config")
// const routes = require('../routes')
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.url = dbConfig.url
db.jobs = require("./jobs.model")
db.user = require("./user.model");
db.employer = require("./employer.model");
module.exports = db;
