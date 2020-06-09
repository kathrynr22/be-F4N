const { selectJobs, insertJob } = require("../models/jobsModels");

exports.getJobs = (req, res, next) => {
  const { sort_by, order, skill_name, location } = req.query;
  selectJobs(sort_by, order, skill_name, location)
    .then((allJobs) => {
      res.send({ allJobs });
    })
    .catch(next);
};

exports.postJob = (req, res, next) => {
  const { username, title, body, skill_name } = req.body;

  insertJob(username, title, body, skill_name)
    .then(([job]) => {
      res.status(201).send({ job });
    })
    .catch(next);
};
