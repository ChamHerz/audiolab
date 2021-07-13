const express = require("express");
const InterlocutorController = require("../controllers/interlocutor");

const api = express.Router();

api.post("/new-interlocutor", InterlocutorController.newInterlocutor);
api.get("/list-interlocutor", InterlocutorController.listInterlocutor);
api.put("/delete-interlocutor", InterlocutorController.deleteInterlocutor);
api.put("/update-interlocutor", InterlocutorController.updateInterlocutor);
api.get(
  "/list-interlocutor-by-audio/:audioId",
  InterlocutorController.listInterlocutorByAudioId
);

module.exports = api;
