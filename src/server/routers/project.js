const express = require("express");
const ProjectController = require("../controllers/project");

const api = express.Router();

api.post("/new-project", ProjectController.newProject);
api.get("/list-project", ProjectController.listProject);
api.get("/find-all-by-ipp/:id", ProjectController.findAllByIpp);
api.post("/add-ipp-to-project/:projectId", ProjectController.addIppToProject);
api.delete("/delete-project/:projectId", ProjectController.deleteProject);

module.exports = api;
