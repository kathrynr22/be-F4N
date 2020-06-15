const { selectCharities } = require('../models/charitiesModels');

exports.getCharities = (req, res, next) => {
  selectCharities()
    .then(charities => {
      res.send({ charities });
    })
    .catch(next);
};
