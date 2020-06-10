const knex = require("../db/connection");

exports.selectSkills = (skill_name) => {
  return knex("skills")
    .select("*")
    .orderBy("skill_id")
    .modify((query) => {
      if (skill_name) query.where({ skill_name });
    })
    .then((skills) => {
      if (skills.length === 0)
        return Promise.reject({ status: 404, msg: "skill not found" });
      else {
        return skills;
      }
    });
};
