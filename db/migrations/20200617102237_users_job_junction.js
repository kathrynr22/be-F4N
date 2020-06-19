exports.up = knex => {
  return knex.schema.createTable('users_job_junction', usersJobTable => {
    usersJobTable.string('username');
    usersJobTable
      .integer('job_id')
      .references('jobs.job_id')
      .onDelete('CASCADE');
    usersJobTable.string('helper_status').defaultsTo('interested');
  });
};

exports.down = knex => {
  return knex.schema.dropTable('users_job_junction');
};

// junctionTable.string('username').references('users.username');
