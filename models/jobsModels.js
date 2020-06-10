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

exports.insertJob = (username, title, body, skill_name) => {
  if (!username || !title || !body || !skill_name) {
    return Promise.reject({
      status: 400,
      msg: "bad request",
    });
  }

  return knex("inserted_job")
    .with(
      "inserted_job",
      knex("jobs")
        .insert({
          username,
          title,
          body,
          skill_id: knex("skills").select("skill_id").where({ skill_name }),
        })
        .returning("*")
    )
    .select(
      "inserted_job.title",
      "inserted_job.body",
      "inserted_job.username",
      "inserted_job.job_id",
      "inserted_job.created_at",
      "skill_name",
      "avatar_url",
      "location"
    )
    .join("skills", "inserted_job.skill_id", "=", "skills.skill_id")
    .join("users", "inserted_job.username", "=", "users.username")
    .leftJoin("comments", "inserted_job.job_id", "=", "comments.job_id")
    .count("comments.job_id AS comment_count")
    .groupBy(
      "inserted_job.title",
      "inserted_job.body",
      "inserted_job.username",
      "inserted_job.job_id",
      "inserted_job.created_at",
      "skills.skill_name",
      "users.avatar_url",
      "users.location"
    );
};

exports.selectCommentsByJobId = (job_id, sort_by, order) => {
  if (order !== undefined && order !== "asc" && order !== "desc") {
    return Promise.reject({
      status: 400,
      msg: "bad request",
    });
  }
  return knex
    .select("comment_id", "created_at", "username", "body")
    .from("comments")
    .where("job_id", job_id)
    .orderBy(sort_by || "created_at", order || "desc")
    .then((comments) => {
      if (comments.length === 0) {
        return knex
          .select("*")
          .from("jobs")
          .where("job_id", job_id)
          .then(([job]) => {
            if (job === undefined) {
              return Promise.reject({
                status: 404,
                msg: "job_id not found",
              });
            }
            return [];
          });
      }
      return comments;
    });
};
