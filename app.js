const express = require('express');
const cors = require('cors');
const apiRouter = require('./routes/apiRouter');
const {
  internalError,
  handlePSQLErrors,
  handleCustomErrors,
} = require('./controllers/errorControllers');
const { checkAuth } = require('./firebase/firebase');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', checkAuth, apiRouter);

app.use(handlePSQLErrors);
app.use(handleCustomErrors);
app.use(internalError);

module.exports = app;
