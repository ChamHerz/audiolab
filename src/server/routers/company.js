const express = require("express");
const CompanyController = require("../controllers/company");

const api = express.Router();

api.post("/new-company", CompanyController.newCompany);
api.get("/list-company", CompanyController.listCompany);

module.exports = api;