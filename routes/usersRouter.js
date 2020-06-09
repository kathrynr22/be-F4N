const usersRouter = require("express").Router();
const { getUsername } = require("../controllers/usersControllers");

usersRouter.route("/:username").get(getUsername);

module.exports = usersRouter;
