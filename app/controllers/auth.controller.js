const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    roles: req.body.roles,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  // user.save()
  //   .then(() => {
      if (req.body.roles) {
        Role.find({ name: { $in: req.body.roles } }).
          then((data) => {
            let role = data.map(role => {
              role._id
            })
            
            user.roles = [data[0]._id]
            user.save().then(() => {
              res.status(200).send({ message: "Register was a success!" })
            })
          }
          );
      } else {
        Role.find({ name: "user" }).then(data => {
          
          if(!data) res.status(500).send({
              message: "There was something wrong with the sysem please wait we are still checking it!" })
          // console.log(data)
          user.roles = [data[0]._id]
          user.save().then(() => {
            res.status(200).send({ message: "Register was a success!" })
          })
        });
      }
//     })
};

exports.signin = (req, res) => {
  User.findOne({ username: req.body.username })
    .populate("roles", "-__v")
    .exec() // Remove the callback function from exec()

    .then((user) => {
      // Rest of the code remains the same
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

      if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid Password!" });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = user.roles.map((role) => "ROLE_" + role.name.toUpperCase());

      req.session.token = token;

      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        token: token,
      });
    })

    .catch((err) => {
      // Handle any errors that occur during the query
      res.status(500).send({ message: err.message });
    });
};
exports.updateUser = (req, res) => {
  if (!req.body){
    res.status(404).send("Cannot update the user")
    return;
  }

  let id = req.body.id;
  User.findByIdAndUpdate(id, req.body)
    .then(user => {
      if(!user){
        res.status(404).send({
          msg: `Cannot update heroes with id=${id}.`
        }) 
      } else res.status(201).send({msg: `User was edited`})
    })
    .catch(err => {
      res.status(500).send({msg: `Error updating user with the id=${id} ${err}`})
    })
  }

exports.findAllusers = (req, res) => {
  // User.find
  User.find().then(user => {
    res.send(user)
  }).catch(err => {
     res.status(404).send({
        message:
        err.message || "Some error occured while getting all users"
      })
    })
}

exports.findUserById = (req, res) => {

  let id = req.body.id;

  User.findById(id)
    .then(user => {
      if (!user) {
        res.status(404).send("The user is not defined");
      } else {
        console.log(user);
        res.send(user);
      }
    })
    .catch(error => {
      res.status(500).send("An error occurred while finding the user");
      console.log("An error occurred while finding the user", error);
    });
  };

exports.deleteOneUser = (req, res) => {

  const id = req.body.id

  User.findByIdAndRemove(id, { userFindAndModify: false })
    .then(user => {
      if (!user) {
        res.status(404).send({
          msg: `Cannot delete user with id=${id}. Maybe it was does not exist`
        })
      } else res.status(201).send({ msg: `User was deleted successfully` })
    })
    .catch(err => {
      res.status(500).send({ msg: `Error deleting user with id=${id}, Error: ${err}` })
    })

}

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};
