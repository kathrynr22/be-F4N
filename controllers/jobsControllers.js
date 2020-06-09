const { selectJobs } = require("../models/jobsModels");

exports.getJobs = (req, res, next) => {
  const { sort_by, order, skill_name, location } = req.query;
  selectJobs(sort_by, order, skill_name, location)
    .then((allJobs) => {
      res.send({ allJobs });
    })
    .catch(next);
};
