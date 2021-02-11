const express = require("express");
const bodyParser = require("body-parser");

const server = express();
const { API_VERSION } = require("./config");

// Load routers
const userRoutes = require("./routers/user");
const projectRoutes = require("./routers/project");
const segmentRoutes = require("./routers/segment");
const audioRoutes = require("./routers/audio.js");
const themeRoutes = require("./routers/theme");
const companyRoutes = require("./routers/company");
const courtRoutes = require("./routers/court");
const interlocutorRoutes = require("./routers/interlocutor.js");
const labelRoutes = require("./routers/label");

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// Configure Header HTTP
// ....

// Router Basic
server.use(`/api/${API_VERSION}/user`, userRoutes);
server.use(`/api/${API_VERSION}/project`, projectRoutes);
server.use(`/api/${API_VERSION}/audio`, audioRoutes);
server.use(`/api/${API_VERSION}/segment`, segmentRoutes);
server.use(`/api/${API_VERSION}/theme`, themeRoutes);
server.use(`/api/${API_VERSION}/company`, companyRoutes);
server.use(`/api/${API_VERSION}/court`, courtRoutes);
server.use(`/api/${API_VERSION}/interlocutor`, interlocutorRoutes);
server.use(`/api/${API_VERSION}/label`, labelRoutes);

module.exports = server;
