const express = require("express");
const ThemeController = require("../controllers/theme");

const api = express.Router();

api.post("/new-theme", ThemeController.newTheme);
api.get("/list-theme", ThemeController.listTheme);
api.post("/delete-theme", ThemeController.deleteTheme);

module.exports = api;