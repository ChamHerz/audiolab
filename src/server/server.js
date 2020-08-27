const express = require("express");
const bodyParser = require("body-parser");

const server = express();
const { API_VERSION } = require("./config");

// Load routers
const userRoutes = require("./routers/user");
const projectRoutes = require("./routers/project");

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// Configure Header HTTP
// ....

// Router Basic
server.use(`/api/${API_VERSION}/user`, userRoutes);
server.use(`/api/${API_VERSION}/project`, projectRoutes);

module.exports = server;
