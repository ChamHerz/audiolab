const express = require("express");
const IppController = require("../controllers/ipp");

const api = express.Router();

api.post("/new-ipp", IppController.newIpp);
api.get("/list-ipp", IppController.listIpp);
api.put("/delete-ipp", IppController.deleteIpp);
api.put("/update-ipp", IppController.updateIpp);
api.get("/find-ipp-by-project/:projectId", IppController.findIppByProject);

module.exports = api;
