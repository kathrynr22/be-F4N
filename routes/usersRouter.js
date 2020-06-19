const usersRouter = require('express').Router();
const {
  getUsername,
  patchUsername,
  getUsers,
  postUser,
} = require('../controllers/usersControllers');
const {
  getNotifications,
  postNotification,
  patchNotification,
} = require('../controllers/notificationsControllers');
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
  .post(postNotification)
  .all(handle405s);

usersRouter
  .route('/:username/notifications/:notification_id')
  .patch(patchNotification)
  .all(handle405s);

module.exports = usersRouter;
