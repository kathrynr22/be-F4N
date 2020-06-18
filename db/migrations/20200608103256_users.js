exports.up = knex => {
  return knex.schema.createTable('users', usersTable => {
    usersTable.string('username', 20).primary();
    usersTable.string('first_name', 20).notNullable();
    usersTable.string('last_name', 20).notNullable();
    usersTable.string('email', 50).notNullable();
    usersTable
      .string('avatar_url')
      .defaultsTo(
        'https://firebasestorage.googleapis.com/v0/b/f-4-n-a30d4.appspot.com/o/users%2Fdefault%2Fl60Hf.png\\?alt=media&token=54af9b55-5829-498a-aa0c-c5d9fc7d6237'
      );
    usersTable.string('location', 4).notNullable();
    usersTable.string('bio', 500);
    usersTable.string('charity_name').references('charities.charity_name');
    usersTable.decimal('amount_raised').defaultTo(0);
  });
};

exports.down = knex => {
  return knex.schema.dropTable('users');
};
