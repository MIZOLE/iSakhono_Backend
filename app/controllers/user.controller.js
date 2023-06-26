const db = require("../models");
const User = db.user;

exports.updateUser = (req, res) => {
  if (!req.body) {
    res.status(404).send("Cannot update the user")
    return;
  }

  let id = req.body.id;
  User.findByIdAndUpdate(id, req.body)
    .then(user => {
      if (!user) {
        res.status(404).send({
          msg: `Cannot update heroes with id=${id}.`
        })
      } else res.status(201).send({ msg: `User was edited` })
    })
    .catch(err => {
      res.status(500).send({ msg: `Error updating user with the id=${id} ${err}` })
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