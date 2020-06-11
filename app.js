const express = require('express');
const admin = require('firebase-admin');
const serviceAccountKey = require('./serviceAccountKey.json');
const cors = require('cors');
const apiRouter = require('./routes/apiRouter');
const {
  internalError,
  handlePSQLErrors,
  handleCustomErrors,
} = require('./controllers/errorControllers');
const { NODE_ENV } = process.env;

const app = express();

app.use(cors());
app.use(express.json());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
  databaseURL: 'https://f-4-n-a30d4.firebaseio.com',
});

function checkAuth(req, res, next) {
  if (req.headers.authtoken) {
    admin
      .auth()
      .verifyIdToken(req.headers.authtoken)
      .then(() => {
        next();
      })
      .catch(() => {
        res.status(403).send('Unauthorized');
      });
  } else if (NODE_ENV === 'test') {
    next();
  } else {
    res.status(403).send('Unauthorized');
  }
}

app.use('/api', checkAuth, apiRouter);

app.use(handlePSQLErrors);
app.use(handleCustomErrors);
app.use(internalError);

module.exports = app;
