const express = require("express");
const cors = require("cors");
const apiRouter = require("./routes/apiRouter");
const { internalError } = require("./controllers/errorControllers");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);

app.use(internalError);

module.exports = app;
