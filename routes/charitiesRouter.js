const charitiesRouter = require('express').Router();
const { getCharities } = require('../controllers/charitiesControllers');

charitiesRouter.route('/').get(getCharities);

module.exports = charitiesRouter;
