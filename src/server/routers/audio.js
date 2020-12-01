const express = require("express");
const AudioController = require("../controllers/audio");

const api = express.Router();

api.post("/new-audio", AudioController.newAudio);
api.get("/list-audio", AudioController.listAudio);
api.get(
  "/list-audio-by-project/:projectId",
  AudioController.listAudioByProjectId
);

module.exports = api;
