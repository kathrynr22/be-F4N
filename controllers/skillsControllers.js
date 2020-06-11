const { selectSkills } = require('../models/skillsModels');

exports.getSkills = (req, res, next) => {
  selectSkills()
    .then(skills => {
      res.send({ skills });
    })
    .catch(next);
};
