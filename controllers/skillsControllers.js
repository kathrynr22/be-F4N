const { selectSkills } = require("../models/skillsModels");

exports.getSkills = (req, res, next) => {
  selectSkills()
    .then((allSkills) => {
      res.send({ allSkills });
    })
    .catch(next);
};
