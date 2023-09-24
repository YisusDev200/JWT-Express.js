const express = require("express");
const app = express();
const routesUser = require('./routes/auth.user')
require('./db')
require("dotenv").config();
app.use(express.json());
app.use('/', routesUser)
app.use((req, res, next) => {
  res.status(404).send("Page not found");
});

module.exports = app;
