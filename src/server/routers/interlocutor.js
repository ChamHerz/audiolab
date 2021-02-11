const express = require("express");
const InterlocutorController = require("../controllers/interlocutor");

const api = express.Router();

api.post("/new-interlocutor", InterlocutorController.newInterlocutor);
api.get("/list-interlocutor", InterlocutorController.listInterlocutor);
api.put("/delete-interlocutor", InterlocutorController.deleteInterlocutor);

module.exports = api;
