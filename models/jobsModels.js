const knex = require("../db/connection");

exports.selectJobs = (sort_by, order, skill_name, location) => {
  if (order !== undefined && order !== "asc" && order !== "desc") {
    return Promise.reject({
      status: 400,
      msg: "bad request",
    });
  }
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
    )
    .orderBy(sort_by || "created_at", order || "desc")
    .modify((query) => {
      if (skill_name && location) query.where({ skill_name, location });
      else if (skill_name) query.where({ skill_name });
      else if (location) query.where({ location });
    });
};
