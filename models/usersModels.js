const knex = require("../db/connection");

exports.selectUsername = (username) => {
  //console.log("inside select username models");
  return knex("users")
    .select(
      "users.username",
      "first_name",
      "last_name",
      "email",
      "avatar_url",
      "location",
      "bio",
      "charities.charity_name",
      "charities.charity_logo",
      knex.raw("ARRAY_AGG (skill_name) skill_name")
    )
    .where("users.username", username)
    .join(
      "users_skills_junction",
      "users.username",
      "=",
      "users_skills_junction.username"
    )
    .join("skills", "skills.skill_id", "=", "users_skills_junction.skill_id")
    .join("charities", "charities.charity_name", "=", "users.charity_name")
    .groupBy("users.username", "charities.charity_name")
    .then((user) => {
      if (user.length === 0)
        return Promise.reject({ status: 404, msg: "username not found" });
      else {
        return user[0];
      }
    });
};
