const express = require("express");
const bodyParser = require("body-parser");

const server = express();
const { API_VERSION } = require("./config");

// Load routers
const userRoutes = require("./routers/user");
const themeRoutes = require("./routers/theme");

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// Configure Header HTTP
// ....

// Router Basic
server.use(`/api/${API_VERSION}`, userRoutes);
server.use(`/api/${API_VERSION}`, themeRoutes);

module.exports = server;
