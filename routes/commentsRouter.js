const commentsRouter = require('express').Router();
const { getCommentsByUsername } = require('../controllers/commentsControllers');
const { handle405s } = require('../controllers/errorControllers');

commentsRouter.route('/').get(getCommentsByUsername).all(handle405s);

module.exports = commentsRouter;
