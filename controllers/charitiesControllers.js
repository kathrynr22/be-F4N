const { selectCharities } = require('../models/charitiesModels');

exports.getCharities = (req, res, next) => {
  selectCharities()
    .then(charities => {
      console.log('hi from charities controller');
      console.log(charities);
      res.send({ charities });
    })
    .catch(next);
};
