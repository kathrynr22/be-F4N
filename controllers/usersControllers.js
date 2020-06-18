const {
  selectUsername,
  selectPatchedUsername,
  insertUser,
  selectUsers,
} = require('../models/usersModels');
const { selectSkills } = require('../models/skillsModels');

exports.getUsername = (req, res, next) => {
  const { username } = req.params;
  selectUsername(username)
    .then(user => {
      res.status(200).send({ user });
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

  if (skill_name) {
    skill_name.forEach(skill => {
      promiseArr.push(selectSkills(skill));
    });
  }

  Promise.all(promiseArr)
    .then(([user]) => {
      res.status(201).send({ user });
    })
    .catch(next);
};

exports.getUsers = (req, res, next) => {
  const { email } = req.query;
  selectUsers(email)
    .then(users => {
      res.send({ users });
    })
    .catch(next);
};

exports.patchUsername = (req, res, next) => {
  const { avatar_url } = req.body;

  const { username } = req.params;

  selectPatchedUsername(username, avatar_url)
    .then(user => {
      res.status(200).send({ user });
    })
    .catch(err => {
      next(err);
    });
};
