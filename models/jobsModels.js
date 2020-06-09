const knex = require("../db/connection");

exports.selectJobs = () => {
  return knex("jobs")
    .select(
      "title",
      "jobs.body",
      "jobs.username",
      "jobs.job_id",
      "jobs.created_at",
      "skill_name",
      "avatar_url",
      "location"
    )
    .join("skills", "jobs.skill_id", "=", "skills.skill_id")
    .join("users", "jobs.username", "=", "users.username")
    .leftJoin("comments", "jobs.job_id", "=", "comments.job_id")
    .count("comments.job_id AS comment_count")
    .groupBy(
      "jobs.job_id",
      "skills.skill_name",
      "users.avatar_url",
      "users.location"
    );
};
