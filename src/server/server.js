const express = require("express");
const bodyParser = require("body-parser");

const server = express();
const { API_VERSION } = require("./config");

// Load routers
const userRoutes = require("./routers/user");
const projectRoutes = require("./routers/project");
const audioRoutes = require("./routers/audio.js");
const themeRoutes = require("./routers/theme");

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// Configure Header HTTP
// ....

// Router Basic
server.use(`/api/${API_VERSION}/user`, userRoutes);
server.use(`/api/${API_VERSION}/project`, projectRoutes);
server.use(`/api/${API_VERSION}/audio`, audioRoutes);
server.use(`/api/${API_VERSION}/theme`, themeRoutes);

module.exports = server;
