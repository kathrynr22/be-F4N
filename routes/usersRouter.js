const usersRouter = require("express").Router();
const { getUsername, postUser } = require("../controllers/usersControllers");
const { handle405s } = require("../controllers/errorControllers");

usersRouter.route("/:username").get(getUsername).all(handle405s);
usersRouter.route("/").post(postUser).all(handle405s);

module.exports = usersRouter;
