const dbConfig = require("../config/db.config")
// const routes = require('../routes')
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.url = dbConfig.url
// db.prof = require("./createprofile.model")(mongoose)
db.user = require("./user.model");
db.role = require("./role.model");
// db.refreshToken = require("./refreshhToken.model")
db.ROLES = ["user", "admin", "moderator"];
module.exports = db;
