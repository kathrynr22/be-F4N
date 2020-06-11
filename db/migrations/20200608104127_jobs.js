exports.up = knex => {
  return knex.schema.createTable('jobs', jobsTable => {
    jobsTable.increments('job_id').primary();
    jobsTable.string('title', 150).notNullable();
    jobsTable.string('body', 500).notNullable();
    jobsTable.string('username').references('users.username');
    jobsTable.string('location', 4).notNullable();
    jobsTable.timestamp('created_at').defaultTo(knex.fn.now());
    jobsTable.integer('skill_id').references('skills.skill_id');
  });
};

exports.down = knex => {
  return knex.schema.dropTable('jobs');
};
