exports.up = knex => {
  return knex.schema.createTable('users_job_junction', junctionTable => {
    junctionTable.string('username');
    junctionTable
      .integer('job_id')
      .references('jobs.job_id')
      .onDelete('CASCADE');
    junctionTable.string('helper_status').defaultsTo('interested');
  });
};

exports.down = knex => {
  return knex.schema.dropTable('users_job_junction');
};

// junctionTable.string('username').references('users.username');
