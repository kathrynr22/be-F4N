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

exports.insertUser = (
  username,
  first_name,
  last_name,
  email,
  avatar_url,
  location,
  bio,
  charity_name,
  skill_name
) => {
  if (
    !username ||
    !first_name ||
    !last_name ||
    !email ||
    !avatar_url ||
    !location ||
    !bio ||
    !charity_name ||
    !skill_name
  ) {
    return Promise.reject({
      status: 400,
      msg: "bad request",
    });
  }
  return knex("users")
    .insert({
      username,
      first_name,
      last_name,
      email,
      avatar_url,
      location,
      bio,
      charity_name,
    })
    .returning("*")
    .then((user) => {
      const usernameSkillObj = skill_name.map((skill) => {
        return {
          username,
          skill_id: knex("skills")
            .select("skill_id")
            .where({ skill_name: skill }),
        };
      });

      return knex("users_skills_junction")
        .insert(usernameSkillObj)
        .returning("*")
        .then(() => {
          return { ...user[0], skill_name };
        });
    });
};
