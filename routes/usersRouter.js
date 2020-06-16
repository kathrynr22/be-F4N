const usersRouter = require('express').Router();
const {
  getUsername,
  getUsers,
  postUser,
} = require('../controllers/usersControllers');
const { handle405s } = require('../controllers/errorControllers');

usersRouter.route('/:username').get(getUsername).all(handle405s);
usersRouter.route('/').post(postUser).get(getUsers).all(handle405s);

module.exports = usersRouter;
