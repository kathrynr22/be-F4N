const skillsRouter = require("express").Router();
const { getSkills } = require("../controllers/skillsControllers");
const { handle405s } = require("../controllers/errorControllers");

skillsRouter.route("/").all(handle405s);

module.exports = skillsRouter;
