const knex = require('../db/connection');

exports.selectNotifications = username => {
  return knex('notifications')
    .select('*')
    .where({ 'notifications.username': username })
    .then(notifications => {
      console.log(notifications);
      return notifications;
    });
  // .orderBy('skill_id')
  // .then(notifications => {
  //   if (notifications.length === 0)
  //     return Promise.reject({ status: 404, msg: 'no notifications found' });
  //   else {
  //     return notifications;
  //   }
  // })
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

exports.selectPatchedNotification = (notification_id, status) => {
  return knex('notifications')
    .where({ 'notifications.notification_id': notification_id })
    .update({ status: status })

    .then(() => {
      return (
        knex('notifications')
          .select('*')
          .where({ 'notifications.notification_id': notification_id })
          // .returning('*')
          .then(notification => {
            if (notification.length === 0)
              return Promise.reject({
                status: 404,
                msg: 'notification_id not found',
              });
            else {
              return notification[0];
            }
          })
      );
    });
};
