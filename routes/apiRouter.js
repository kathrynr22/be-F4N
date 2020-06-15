const apiRouter = require('express').Router();
const jobsRouter = require('./jobsRouter');
const skillsRouter = require('./skillsRouter');
const usersRouter = require('./usersRouter');
const commentsRouter = require('./commentsRouter');
const charitiesRouter = require('./charitiesRouter');
const endpoints = require('../endpoints.json');

apiRouter.route('/').get((req, res, next) => {
  res.status(200).send(endpoints);
});

apiRouter.use('/jobs', jobsRouter);
apiRouter.use('/skills', skillsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/comments', commentsRouter);
apiRouter.use('/charities', charitiesRouter);

module.exports = apiRouter;
