exports.internalError = (err, req, res, next) => {
  const { method, url } = req;
  console.log(`error occured on ${method} ${url}:`, err);
  res.status(500).send({ msg: "Internal Server Error" });
};
