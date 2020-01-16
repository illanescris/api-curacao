const express = require("express");
const app = express();

app.use("/v1/mesas", require("./mesas"));
app.use("/v1/sectores", require("./sectores"));
app.use("/v1/productos", require("./productos"));
app.use("/v1/categorias", require("./categorias"));

module.exports = app;