const jobsRouter = require("express").Router();
const { getJobs, getJob, postJob } = require("../controllers/jobsControllers");
const { handle405s } = require("../controllers/errorControllers");

jobsRouter.route("/").get(getJobs).post(postJob).all(handle405s);
jobsRouter.route("/:job_id").get(getJob).all(handle405s);

module.exports = jobsRouter;
