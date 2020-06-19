const charitiesRouter = require('express').Router();
const { handle405s } = require('../controllers/errorControllers');
const { getCharities } = require('../controllers/charitiesControllers');

charitiesRouter.route('/').get(getCharities).all(handle405s);

module.exports = charitiesRouter;
