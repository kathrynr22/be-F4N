if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const admin = require('firebase-admin');
const {
  type,
  project_id,
  private_key_id,
  private_key,
  client_email,
  client_id,
  auth_uri,
  token_uri,
  auth_provider_x509_cert_url,
  client_x509_cert_url,
  NODE_ENV,
} = process.env;

const serviceAccountKey = {
  type,
  project_id,
  private_key_id,
  private_key: private_key.replace(/\\n/g, '\n'),
  client_email,
  client_id,
  auth_uri,
  token_uri,
  auth_provider_x509_cert_url,
  client_x509_cert_url,
};

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
