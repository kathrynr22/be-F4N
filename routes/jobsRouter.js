const jobsRouter = require('express').Router();
const {
  getJobs,
  getJob,
  postJob,
  delJob,
  patchJob,
  getCommentsByJobId,
  postComment,
  getHelpersByJobId,
  postHelperByJobId,
  patchHelper,
} = require('../controllers/jobsControllers');
const { handle405s } = require('../controllers/errorControllers');

jobsRouter.route('/').get(getJobs).post(postJob).all(handle405s);
jobsRouter
  .route('/:job_id')
  .get(getJob)
  .patch(patchJob)
  .delete(delJob)
  .all(handle405s);
jobsRouter
  .route('/:job_id/comments')
  .get(getCommentsByJobId)
  .post(postComment)
  .all(handle405s);

jobsRouter
  .route('/:job_id/helpers')
  .get(getHelpersByJobId)
  .post(postHelperByJobId)
  .patch(patchHelper);

module.exports = jobsRouter;
