const express = require("express");
const LabelController = require("../controllers/label.js");

const api = express.Router();

api.get("/get-max-id", LabelController.getMaxId);
api.post("/new-label", LabelController.newLabel);
api.get("/list-label-by-audio/:audioId", LabelController.listLabelByAudioId);
api.put("/delete-label-by-id/:labelId", LabelController.deleteLabel);
api.put("/update-label", LabelController.updateLabel);

module.exports = api;
