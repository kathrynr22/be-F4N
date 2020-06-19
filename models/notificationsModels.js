const knex = require('../db/connection');

exports.selectNotifications = username => {
  return knex('notifications')
    .select('*')
    .where({ 'notifications.username': username })
    .then(notifications => {
      return notifications;
    });
};

exports.insertNotification = (username, body) => {
  return knex('notifications')
    .insert({
      username: username,
      body: body,
    })

    .returning('*')
    .then(notification => {
      return notification[0];
    });
};

exports.selectPatchedNotification = (status, notification_id) => {
  return knex('notifications')
    .where({ notification_id: notification_id })
    .update({ status: status })

    .then(() => {
      return knex('notifications')
        .select('*')
        .where({ notification_id: notification_id })
        .then(notification => {
          if (notification.length === 0)
            return Promise.reject({
              status: 404,
              msg: 'notification_id not found',
            });
          else {
            return notification[0];
          }
        });
    });
};
