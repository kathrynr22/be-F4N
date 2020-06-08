exports.up = (knex) => {
  return knex.schema.createTable("skills", (skillsTable) => {
    skillsTable.increments("skill_id").primary();
    skillsTable.string("skill_name", 30).notNullable();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("skills");
};
