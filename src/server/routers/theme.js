const express = require("express");
const ThemeController = require("../controllers/theme");

const api = express.Router();

api.post("/new-theme", ThemeController.newTheme);
api.get("/list-theme", ThemeController.listTheme);
api.put("/delete-theme", ThemeController.deleteTheme);
api.put("/update-theme", ThemeController.updateTheme);

module.exports = api;