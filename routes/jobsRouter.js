const jobsRouter = require("express").Router();
const { getJobs } = require("../controllers/jobsControllers");
const { handle405s } = require("../controllers/errorControllers");

jobsRouter.route("/").get(getJobs).all(handle405s);

module.exports = jobsRouter;
