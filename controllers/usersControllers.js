const { selectUsername, insertUser } = require("../models/usersModels");
const { selectSkills } = require("../models/skillsModels");

exports.getUsername = (req, res, next) => {
  const { username } = req.params;
  selectUsername(username)
    .then((userObject) => {
      res.status(200).send({ userObject });
    })
    .catch(next);
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

  skill_name.forEach((skill) => {
    promiseArr.push(selectSkills(skill));
  });

  Promise.all(promiseArr)
    .then(([user]) => {
      res.status(201).send({ user });
    })
    .catch(next);
};
