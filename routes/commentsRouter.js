const commentsRouter = require('express').Router();
const { getCommentsByUsername } = require('../controllers/jobsControllers');

commentsRouter.route('/').get(getCommentsByUsername);

module.exports = commentsRouter;
