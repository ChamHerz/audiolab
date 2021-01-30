const express = require("express");
const SegmentController = require("../controllers/segment");

const api = express.Router();

api.post("/new-segment", SegmentController.newSegment);

module.exports = api;
