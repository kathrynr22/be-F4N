const commentsRouter = require('express').Router();
const { getCommentsByUsername } = require('../controllers/commentsControllers');

commentsRouter.route('/').get(getCommentsByUsername);

module.exports = commentsRouter;
