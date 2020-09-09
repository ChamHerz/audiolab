const express = require("express");
const ThemeController = require("../controllers/theme");

const api = express.Router();

api.post("/newTheme", ThemeController.newTheme);
api.post("/allThemes", ThemeController.getAllThemes);

module.exports = api;
