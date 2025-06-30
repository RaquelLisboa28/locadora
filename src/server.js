require("dotenv").config()
const express = require("express");
const routes = require("./routes/index")

const app = express();

app.use(express.json());
app.use(routes)

const port = process.env.NODE_PORT

app.listen(port, function () {
  console.log(`Rodando na porta ${port}`);
});
