const express = require("express");
const ProjectController = require("../controllers/project");

const api = express.Router();

api.post("/new-project", ProjectController.newProject);

module.exports = api;
