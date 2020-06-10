exports.up = (knex) => {
  return knex.schema.createTable("comments", (commentsTable) => {
    commentsTable.increments("comment_id").primary();
    commentsTable.string("username").references("users.username");
    commentsTable
      .integer("job_id")
      .references("jobs.job_id")
      .onDelete("CASCADE");
    commentsTable.timestamp("created_at").defaultTo(knex.fn.now());
    commentsTable.string("body", 500).notNullable();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("comments");
};
