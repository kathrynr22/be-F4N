const apiRouter = require('express').Router();
const jobsRouter = require('./jobsRouter');
const skillsRouter = require('./skillsRouter');
const usersRouter = require('./usersRouter');
const endpoints = require('../endpoints.json');
const { checkAuth } = require('../firebase/firebase');

apiRouter.route('/').get((req, res, next) => {
  res.status(200).send(endpoints);
});

apiRouter.use('/jobs', checkAuth, jobsRouter);
apiRouter.use('/skills', skillsRouter);
apiRouter.use('/users', checkAuth, usersRouter);

module.exports = apiRouter;
