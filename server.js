const express = require("express");
const app = express();
const routes = require("./routes/routes");

app.use(express.json());
app.use(routes);

app.get('/', (req, res) => {
    res.send("Hello World");
})

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
})