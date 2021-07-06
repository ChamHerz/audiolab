const express = require("express");
const ProjectController = require("../controllers/project");

const api = express.Router();

api.post("/new-project", ProjectController.newProject);
api.get("/list-project", ProjectController.listProject);
api.post("/add-ipp-to-project/:projectId", ProjectController.addIppToProject);

module.exports = api;
