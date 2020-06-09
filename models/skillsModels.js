const knex = require("../db/connection");

exports.selectSkills = () => {
  return knex("skills").select("*").orderBy("skill_id");
};
