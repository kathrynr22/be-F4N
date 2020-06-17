const {
  selectJobs,
  selectJob,
  selectPatchedJob,
  insertJob,
  deleteJob,
  selectCommentsByJobId,
  selectHelpersByJobId,
  insertComment,
  insertHelper,
  selectPatchedHelper,
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
  const { username, title, body, skill_name, location, job_status } = req.body;

  const promiseArr = [
    insertJob(username, title, body, skill_name, location, job_status),
    selectUsername(username),
    selectSkills(skill_name),
  ];

  Promise.all(promiseArr)
    .then(([[job]]) => {
      res.status(201).send({ job });
    })
    .catch(next);
};

exports.patchJob = (req, res, next) => {
  const { job_status } = req.body;
  const { job_id } = req.params;
  selectPatchedJob(job_id, job_status)
    .then(job => {
      res.status(200).send({ job });
    })
    .catch(err => {
      next(err);
    });
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

exports.getHelpersByJobId = (req, res, next) => {
  const { job_id } = req.params;
  selectHelpersByJobId(job_id)
    .then(helpers => {
      res.status(200).send({ helpers });
    })
    .catch(err => {
      next(err);
    });
};

exports.postHelperByJobId = (req, res, next) => {
  const { username } = req.body;
  const { job_id } = req.params;

  insertHelper(job_id, username)
    .then(helper => {
      res.status(201).send({ helper });
    })
    .catch(err => {
      next(err);
    });
};

exports.patchHelper = (req, res, next) => {
  const { helper_status } = req.body;

  const { job_id } = req.params;

  selectPatchedHelper(job_id, helper_status)
    .then(helper => {
      res.status(200).send({ helper });
    })
    .catch(err => {
      next(err);
    });
};
