const express = require("express");
const app = express();

const logger = require("./middlewares/logger");

const morgan = require("morgan");

const studentroute = require("./routes/studentroute");
const usersroute = require("./routes/usersroute");

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan("tiny"));
app.use("/api/v1", studentroute);
app.use("/api/v1", usersroute);
app.use(logger);
app.use("*", (req, res) => {
  response.response(res, 404, "error", "resource not found", true);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
