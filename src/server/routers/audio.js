const express = require("express");
const AudioController = require("../controllers/audio");

const api = express.Router();

api.post("/new-audio", AudioController.newAudio);
api.get("/list-audio", AudioController.listAudio);

module.exports = api;
