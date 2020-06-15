const usersRouter = require('express').Router();
const { getUsername, postUser } = require('../controllers/usersControllers');
const { handle405s } = require('../controllers/errorControllers');
const { checkAuth } = require('../firebase/firebase');

usersRouter.route('/:username').get(checkAuth, getUsername).all(handle405s);
usersRouter.route('/').post(postUser).all(handle405s);

module.exports = usersRouter;
