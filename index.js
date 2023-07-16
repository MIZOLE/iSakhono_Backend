require("dotenv").config()
const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const app = express();
// set port, listen for requests
const PORT = process.env.PORT || 8080;
// app.use(express)

// var corsOptions = {
//   origin: "http://localhost:8080"
// };

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

let DB = require("./app/config/db.config")
// const DB = require("./config/db.config")

db.mongoose.connect(DB.url_, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });
  

app.use(
  cookieSession({
    name: "isakhono",
    secret: "the_skill", // should use as secret environment variable
    httpOnly: true
  })
);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "welcome to Isakhono." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/employers.routes')(app)
require('./app/routes/jobs.routes')(app)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

