const config = require("../config/auth.config");
const db = require("../models");
const Jobs = db.jobs;

exports.create_job = async (req, res) => {
    if (!req.body.jobtile){
        res.send({message: "Cant post without titles" })
        return
    }

    // const jobtile = await Jobs.findOne({ jobtile: req.body.jobtile }).exec();
    // if (jobtile){
    //     return res.status(400).send({ message: "Failed! Jobtitle is already exist!" });
    // }
    const jobs = new Jobs({
        jobtile: req.body.jobtile,
        companyname: req.body.companyname,
        location: req.body.location,
        work_type: req.body.work_type,
        job_description: req.body.job_description
    });
    
    jobs.save().then(() => {
        res.status(200).send({ message: "The job post was created" })
    }).catch(err => {
        res.status(500).send({
            messege: 
            err.messege || "Some error occured while creating the the post"
        })
    })

}

exports.findAlljobs = (req, res) => {
    // User.find
    Jobs.find().then(user => {
      res.send(user)
    }).catch(err => {
      res.status(404).send({
        message:
          err.message || "Some error occured while getting all users"
      })
    })
  }
  
