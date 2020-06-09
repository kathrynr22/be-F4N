const { selectJobs } = require("../models/jobsModels");

exports.getJobs = (req, res, next) => {
  selectJobs()
    .then((allJobs) => {
      res.send({ allJobs });
    })
    .catch(next);
};
