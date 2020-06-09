const apiRouter = require("express").Router();
const jobsRouter = require("./jobsRouter");

apiRouter.route("/").get((req, res, next) => {
  res.status(200);
});

apiRouter.use("/jobs", jobsRouter);

module.exports = apiRouter;
