const {
  selectJobs,
  selectJob,
  insertJob,
  deleteJob,
  selectCommentsByJobId,
  insertComment,
  selectCommentsByUsername,
} = require('../models/jobsModels');
const { selectUsername } = require('../models/usersModels');
const { selectSkills } = require('../models/skillsModels');

exports.getJobs = (req, res, next) => {
  const { sort_by, order, skill_name, location, username } = req.query;
  selectJobs(sort_by, order, skill_name, location, username)
    .then(jobs => {
      res.send({ jobs });
    })
    .catch(next);
};

exports.getJob = (req, res, next) => {
  const { job_id } = req.params;
  selectJob(job_id)
    .then(job => {
      res.send({ job });
    })
    .catch(next);
};

exports.postJob = (req, res, next) => {
  const { username, title, body, skill_name, location } = req.body;

  const promiseArr = [
    insertJob(username, title, body, skill_name, location),
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
  const { sort_by, order, location, charity_name } = req.query;
  selectCommentsByJobId(job_id, sort_by, order, location, charity_name)
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(err => {
      next(err);
    });
};

exports.getCommentsByUsername = (req, res, next) => {
  console.log('hello?');
  const { username } = req.query;
  console.log(username);
  selectCommentsByUsername(username)
    .then(comments => {
      console.log('inside controllers');
      console.log(comments);
      res.status(200).send({ comments });
    })
    .catch(err => {
      console.log('inside catch');
      console.log(err);
      next(err);
    });
};

exports.postComment = (req, res, next) => {
  const { body, username } = req.body;
  const { job_id } = req.params;

  const promiseArr = [
    insertComment(job_id, body, username),
    selectUsername(username),
    selectJob(job_id),
  ];

  Promise.all(promiseArr)
    .then(([comment]) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};
