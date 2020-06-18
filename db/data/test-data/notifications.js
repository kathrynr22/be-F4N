// exports.up = knex => {
//   return knex.schema.createTable('notifications', notificationsTable => {
//     notificationsTable.string('username').references('users.username');
//     notificationsTable.string('body', 150).notNullable();
//     notificationsTable.string('status').notNullable();
//   });
// };

module.exports = [
  {
    //comment_id added automatically by database
    username: 'gdurdane',
    body: 'You have received a comment on your job',
    status: 'unread',
  },
  {
    //comment_id added automatically by database
    username: 'twebleyf',
    body: 'You have received a comment on your job',
    status: 'unread',
  },
  {
    //comment_id added automatically by database
    username: 'wstallebrass2r',
    body: 'You have received a comment on your job',
    status: 'unread',
  },
  {
    //comment_id added automatically by database
    username: 'jhumbell',
    body: 'You have received a comment on your job',
    status: 'unread',
  },
  {
    //comment_id added automatically by database
    username: 'cmarchbankj',
    body: 'You have received a comment on your job',
    status: 'unread',
  },
  {
    //comment_id added automatically by database
    username: 'dfoxl',
    body: 'You have received a comment on your job',
    status: 'unread',
  },
];
