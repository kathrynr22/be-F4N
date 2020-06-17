exports.up = knex => {
  return knex.schema.createTable('users_job_junction', junctionTable => {
    junctionTable.string('username').references('users.username');
    junctionTable.integer('job_id').references('jobs.job_id');
    junctionTable.string('helper_status');
  });
};

exports.down = knex => {
  return knex.schema.dropTable('users_job_junction');
};
