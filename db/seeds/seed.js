const {
  charities,
  comments,
  jobs,
  skills,
  users,
  usersSkills,
} = require("../data/index.js");

exports.seed = (knex) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex("charities").insert(charities);
    })
    .then(() => {
      return knex("skills").insert(skills);
    })
    .then(() => {
      return knex("users").insert(users);
    })
    .then(() => {
      return knex("users_skills_junction").insert(usersSkills);
    })
    .then(() => {
      return knex("jobs").insert(jobs);
    })
    .then(() => {
      return knex("comments").insert(comments);
    });
};
