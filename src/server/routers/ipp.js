const express = require("express");
const IppController = require("../controllers/ipp");

const api = express.Router();

api.post("/new-ipp", IppController.newIpp);

module.exports = api;
