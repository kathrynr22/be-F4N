const {
  selectNotifications,
  insertNotification,
  selectPatchedNotification,
} = require('../models/notificationsModels');

exports.getNotifications = (req, res, next) => {
  const { username } = req.params;
  selectNotifications(username)
    .then(notifications => {
      res.status(200).send({ notifications });
    })
    .catch(err => {
      next(err);
    });
};

exports.postNotification = (req, res, next) => {
  const { body, username } = req.body;
  insertNotification(username, body)
    .then(notification => {
      res.status(201).send({ notification });
    })
    .catch(err => {
      next(err);
    });
};

exports.patchNotification = (req, res, next) => {
  const { status } = req.body;
  const { notification_id } = req.params;

  selectPatchedNotification(status, notification_id)
    .then(notification => {
      res.status(200).send({ notification });
    })
    .catch(err => {
      next(err);
    });
};
