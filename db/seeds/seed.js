const {
  charities,
  comments,
  jobs,
  skill,
  user,
  userSkills,
} = require("../data/index.js");

exports.seed = (knex) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex("charities").insert(charities);
    });
};
