const usersRouter = require('express').Router();
const {
  getUsername,
  patchUsername,
  getUsers,
  postUser,
  getNotifications,
  postNotification,
  patchNotification,
} = require('../controllers/usersControllers');
const { handle405s } = require('../controllers/errorControllers');
const { checkAuth } = require('../firebase/firebase');

usersRouter
  .route('/:username')
  .get(checkAuth, getUsername)
  .patch(patchUsername)
  .all(handle405s);
usersRouter.route('/').post(postUser).get(checkAuth, getUsers).all(handle405s);
usersRouter
  .route('/:username/notifications')
  .get(getNotifications)
  .post(postNotification);

usersRouter
  .route('/:username/notifications/:notification_id')
  .patch(patchNotification);

module.exports = usersRouter;
