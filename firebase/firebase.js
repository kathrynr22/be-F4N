const admin = require('firebase-admin');
const serviceAccountKey = require('./serviceAccountKey.json');
const { NODE_ENV } = process.env;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
  databaseURL: 'https://f-4-n-a30d4.firebaseio.com',
});

exports.checkAuth = (req, res, next) => {
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
};
