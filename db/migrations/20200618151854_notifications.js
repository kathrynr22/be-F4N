exports.up = knex => {
  return knex.schema.createTable('notifications', notificationsTable => {
    notificationsTable.string('username').references('users.username');
    notificationsTable.string('body', 150).notNullable();
    notificationsTable.string('status').defaultTo('unread');
  });
};

exports.down = knex => {
  return knex.schema.dropTable('notifications');
};
