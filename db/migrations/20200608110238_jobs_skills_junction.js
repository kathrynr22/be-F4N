exports.up = (knex) => {
  return knex.schema.createTable("jobs_skills_junction", (junctionTable) => {
    junctionTable.integer("job_id").references("jobs.job_id");
    junctionTable.integer("skill_id").references("skills.skill_id");
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("jobs_skills_junction");
};
