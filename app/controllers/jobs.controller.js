const config = require("../config/auth.config");
const db = require("../models");
const Jobs = db.jobs;
const Employer = db.employer

//create a job post
exports.create_job = async (req, res) => {
  if (!req.body.jobtitle) {
    res.send({ message: "Cant post without titles" })
    return
  }

  const jobs = new Jobs({
    jobtitle: req.body.jobtitle,
    companyid: req.userId,
    location: req.body.location,
    work_type: req.body.work_type,
    job_description: req.body.job_description
  });
  console.log(jobs)

  jobs.save().then(() => {
    res.status(200).send({ message: "The job post was created" })
  }).catch(err => {
    res.status(500).send({
      messege:
        err.messege || "Some error occured while creating the the post"
    })
  })

}

exports.findOne = (req, res) => {

  let id = req.params.id;

  Jobs.findById(id)
    .then(data => {
      if (!data) {
        res.status(404).send("We could not find the job with an id="+id);
      } else {
        console.log(data);
        res.send(data);
      }
    })
    .catch(error => {
      res.status(500).send("An error occurred while finding the employer");
      console.log("An error occurred while finding the employer", error);
    });

}

//find jobs available
exports.findAlljobs = (req, res) => {
  // User.find
  Jobs.find().then(data => {
    res.send(data)
  }).catch(err => {
    res.status(404).send({
      message:
        err.message || "Some error occured while getting all users"
    })
  })
}

//update a job post for only your own company
exports.updateajobpost = (req, res) => {
  if (!req.body) {
    res.status(404).send("Cannot update the job")
    return;
  }

  let id = req.params.id;
  Jobs.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(job => {
      if (!job) {
        res.status(404).send({
          msg: `Cannot update the job with id=${id}.`
        })
      } else res.status(201).send({ msg: `job was edited` })
    })
}

//delete a job post for your own company(supposely)
exports.deleteajob = (req, res) => {
  const id = req.params.id

  Jobs.findByIdAndRemove(id, { jobFindAndModify: false })
    .then(job => {
      if (!job) {
        res.status(404).send({
          msg: `Cannot delete the job with id=${id}`
        })
      } else res.status(201).send({ msg: `The job post was deleted successfully` })
    })
    .catch(err => {
      res.status(500).send({ msg: `Error deleting the job post with id=${id}, Error: ${err}` })
    })
}

//get a jobs for a specific company, and only for that company
exports.onlyGetSpecificCompanypost = (req, res) => {
   
  console.log(req.params.companyid)
  Jobs.find({ companyid: req.params.companyid }).then(data => {
      if (!data) {
        res.status(500).send({ msg: `No job posts from this company` })
      }
      else if (data){
        res.send(data)
      }
    }).catch(err => {
      res.status(404).send({
        message:
          err.message || "Some error occured while getting specified company post"
      })
    })
}







