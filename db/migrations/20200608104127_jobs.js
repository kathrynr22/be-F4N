exports.up = (knex) => {
  return knex.schema.createTable("jobs", (jobsTable) => {
    jobsTable.increments("job_id").primary();
    jobsTable.string("title", 150).notNullable();
    jobsTable.string("body", 500).notNullable();
    jobsTable.string("location", 4).notNullable();
    jobsTable.string("username").references("users.username");
    jobsTable.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("jobs");
};
