require("dotenv").config()
const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
require('dotenv').config()

const app = express();
// app.use(express)
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
  
// var corsOptions = {
//   origin: "http://localhost:8080"
// };

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "isakhono",
    secret: "the_skill", // should use as secret environment variable
    httpOnly: true
  })
);

// app.post('/api/auth/signin', (req, res) => {
//   // Your code to handle the signin request
  
//   // For example, you can send a response indicating that the endpoint is not implemented yet
//   res.status(501).json({ message: 'Not implemented' });
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "welcome to Isakhono." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/employers.routes')(app)
// require('./app/routes/createjobs.routes')(app)


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

