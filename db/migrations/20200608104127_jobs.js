exports.up = knex => {
  return knex.schema.createTable('jobs', jobsTable => {
    jobsTable.increments('job_id').primary();
    jobsTable.string('title', 125).notNullable();
    jobsTable.string('body', 500).notNullable();
    jobsTable.string('username').references('users.username');
    jobsTable.string('location', 4).notNullable();
    jobsTable.string('job_status').defaultTo('created');
    jobsTable.timestamp('created_at').defaultTo(knex.fn.now());
    jobsTable.integer('skill_id').references('skills.skill_id');
    jobsTable.string('job_image');
    jobsTable.decimal('pledged_amount').defaultTo(0);
  });
};

exports.down = knex => {
  return knex.schema.dropTable('jobs');
};
