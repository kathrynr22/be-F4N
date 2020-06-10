const { selectJobs, insertJob } = require("../models/jobsModels");
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
