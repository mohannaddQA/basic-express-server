"use strict";
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT;

//------------------------------------requirements------------------------------------

const internalError = require("./error-handlers/500");
const pageNotFound = require("./error-handlers/404");
const logger = require("./middleware/logger");
const validator = require("./middleware/validator");
//---------------------------------******************----------------------------------
//---------------------------------global middlewares----------------------------------
app.use(cors());
app.use(express.json());
app.use(logger);
//---------------------------------******************----------------------------------
//----------------------------------------routes---------------------------------------
app.get("/", (req, res) => {
  res.status(200).send("server home page");
});

app.get("/person", validator, (req, res) => {
  const name = req.query.name;
  res.status(200).json({ name: name });
});

//---------------------------------******************----------------------------------
//---------------------------------error middlewares---------------------------------- must be after the routes
app.use(internalError);
app.use("*", pageNotFound);
//---------------------------------******************----------------------------------

function start(port) {
  app.listen(port, () => {
    console.log(`server is running on ${port}`);
  });
}

// when the index requires this file it will only see these
module.exports = {
  port: port, //i'm sending the port as an export to the index
  app: app,
  start: start, // i'm sending the start function to the index
};
