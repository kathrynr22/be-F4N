exports.internalError = (err, req, res, next) => {
  const { method, url } = req;
  console.log(`error occured on ${method} ${url}:`, err);
  res.status(500).send({ msg: "Internal Server Error" });
};

exports.handle405s = (req, res) => {
  res.status(405).send({ msg: "method not allowed" });
};

exports.handlePSQLErrors = (err, req, res, next) => {
  const badReqCodes = ["42703", "22P02", "23503"];
  if (badReqCodes.includes(err.code)) {
    res.status(400).send({ msg: "bad request" });
  } else {
    next(err);
  }
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};
