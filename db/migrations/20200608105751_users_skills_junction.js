exports.up = (knex) => {
  return knex.schema.createTable("users_skills_junction", (junctionTable) => {
    junctionTable.string("username").references("users.username");
    junctionTable.integer("skill_id").references("skills.skill_id");
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("users_skills_junction");
};
