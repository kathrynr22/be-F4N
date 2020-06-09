const { selectJobs } = require("../models/jobsModels");

exports.getJobs = (req, res, next) => {
  const { sort_by, order } = req.query;
  selectJobs(sort_by, order)
    .then((allJobs) => {
      res.send({ allJobs });
    })
    .catch(next);
};
