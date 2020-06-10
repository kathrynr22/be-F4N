const jobsRouter = require("express").Router();
const {
  getJobs,
  getJob,
  postJob,
  delJob,
  getCommentsByJobId,
  postComment,
} = require("../controllers/jobsControllers");
const { handle405s } = require("../controllers/errorControllers");

jobsRouter.route("/").get(getJobs).post(postJob).all(handle405s);
jobsRouter.route("/:job_id").get(getJob).delete(delJob).all(handle405s);
jobsRouter
  .route("/:job_id/comments")
  .get(getCommentsByJobId)
  .post(postComment)
  .all(handle405s);

module.exports = jobsRouter;
