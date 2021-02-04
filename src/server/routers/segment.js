const express = require("express");
const SegmentController = require("../controllers/segment");

const api = express.Router();

api.post("/new-segment", SegmentController.newSegment);
api.get("/get-max-id", SegmentController.getMaxId);
api.get(
  "/list-segment-by-audio/:audioId",
  SegmentController.listSegmentByAudioId
);

module.exports = api;
