const usersRouter = require('express').Router();
const {
  getUsername,
  patchUsername,
  getUsers,
  postUser,
  getNotifications,
} = require('../controllers/usersControllers');
const { handle405s } = require('../controllers/errorControllers');
const { checkAuth } = require('../firebase/firebase');

usersRouter
  .route('/:username')
  .get(checkAuth, getUsername)
  .patch(patchUsername)
  .all(handle405s);
usersRouter.route('/').post(postUser).get(checkAuth, getUsers).all(handle405s);
usersRouter.route('/:username/notifications').get(getNotifications);

module.exports = usersRouter;
