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
      console.log(err);
      next(err);
    });
};

exports.patchNotification = (req, res, next) => {
  const { status } = req.body;
  console.log(status);

  const { notification_id } = req.params;
  console.log(notification_id);

  selectPatchedNotification(status, notification_id)
    .then(notification => {
      console.log(notification);
      res.status(200).send({ notification });
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
};
