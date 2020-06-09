const jobsRouter = require("express").Router();
const { getJobs } = require("../controllers/jobsControllers");

jobsRouter.route("/").get(getJobs);

module.exports = jobsRouter;
