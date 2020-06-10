const { selectUsername, insertUser } = require("../models/usersModels");
const { selectSkills } = require("../models/skillsModels");

exports.getUsername = (req, res, next) => {
  const { username } = req.params;
  selectUsername(username)
    .then((userObject) => {
      res.status(200).send({ userObject });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postUser = (req, res, next) => {
  const {
    username,
    first_name,
    last_name,
    email,
    avatar_url,
    location,
    bio,
    charity_name,
    skill_name,
  } = req.body;

  const promiseArr = [
    selectSkills(skill_name),
    insertUser(
      username,
      first_name,
      last_name,
      email,
      avatar_url,
      location,
      bio,
      charity_name,
      skill_name
    ),
  ];

  Promise.all(promiseArr)
    .then(([[user]]) => {
      console.log("insider controller");
      console.log(user);
      res.status(201).send({ user });
    })
    .catch(next);
};
