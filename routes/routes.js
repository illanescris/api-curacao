const express = require("express");
const app = express();

app.use("/v1/mesas", require("./mesas"));

module.exports = app;