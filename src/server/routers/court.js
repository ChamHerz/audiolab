const express = require("express");
const CourtController = require("../controllers/court");

const api = express.Router();

api.post("/new-court", CourtController.newCourt);
api.get("/list-court", CourtController.listCourt);

module.exports = api;