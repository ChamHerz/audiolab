const express = require("express");
const AudioController = require("../controllers/audio");

const api = express.Router();

api.post("/new-audio", AudioController.newAudio);
api.get("/list-audio", AudioController.listAudio);
api.get(
  "/list-audio-by-project/:projectId",
  AudioController.listAudioByProjectId
);
api.put("/delete-audio-by-id/:audioId", AudioController.deleteAudio);
api.put("/create-data-audio-by-id/:audioId", AudioController.createDataAudio);

module.exports = api;
