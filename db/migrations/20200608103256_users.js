exports.up = knex => {
  return knex.schema.createTable('users', usersTable => {
    usersTable.string('username', 20).primary();
    usersTable.string('first_name', 20).notNullable();
    usersTable.string('last_name', 20).notNullable();
    usersTable.string('email', 50).notNullable();
    usersTable.string('avatar_url');
    usersTable.string('location', 4).notNullable();
    usersTable.string('bio', 500);
    usersTable.string('charity_name').references('charities.charity_name');
  });
};

exports.down = knex => {
  return knex.schema.dropTable('users');
};
