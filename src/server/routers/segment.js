const express = require("express");
const SegmentController = require("../controllers/segment");

const api = express.Router();

api.post("/new-segment", SegmentController.newSegment);
api.get("/get-max-id", SegmentController.getMaxId);
api.get(
  "/list-segment-by-audio/:audioId",
  SegmentController.listSegmentByAudioId
);
api.put("/delete-segment-by-id/:segmentId", SegmentController.deleteSegment);
api.put("/update-segment", SegmentController.updateSegment);

module.exports = api;
