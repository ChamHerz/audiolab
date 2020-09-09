import { basePath, apiVersion } from "./config";
const axios = require("axios").default;

export function newProject(data) {
  return axios.post(`${basePath}/${apiVersion}/project/new-project`, data);
}

export function listProject() {
  return axios.get(`${basePath}/${apiVersion}/project/list-project`);
}
