const {
  selectJobs,
  selectJob,
  insertJob,
  deleteJob,
  selectCommentsByJobId,
} = require("../models/jobsModels");
const { selectUsername } = require("../models/usersModels");
const { selectSkills } = require("../models/skillsModels");

exports.getJobs = (req, res, next) => {
  const { sort_by, order, skill_name, location } = req.query;
  selectJobs(sort_by, order, skill_name, location)
    .then((allJobs) => {
      res.send({ allJobs });
    })
    .catch(next);
};

exports.getJob = (req, res, next) => {
  const { job_id } = req.params;
  selectJob(job_id)
    .then((job) => {
      res.send({ job });
    })
    .catch(next);
};

exports.postJob = (req, res, next) => {
  const { username, title, body, skill_name } = req.body;

  const promiseArr = [
    insertJob(username, title, body, skill_name),
    selectUsername(username),
    selectSkills(skill_name),
  ];

  Promise.all(promiseArr)
    .then(([[job]]) => {
      res.status(201).send({ job });
    })
    .catch(next);
};

exports.delJob = (req, res, next) => {
  const { job_id } = req.params;
  deleteJob(job_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
};

exports.getCommentsByJobId = (req, res, next) => {
  const { job_id } = req.params;
  const { sort_by, order } = req.query;
  selectCommentsByJobId(job_id, sort_by, order)
    .then((comments) => {
      console.log("inside controllers");
      console.log(comments);
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};
