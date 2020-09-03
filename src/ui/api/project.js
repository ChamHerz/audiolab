import { basePath, apiVersion } from "./config";
const axios = require("axios").default;

export function newProject(data) {
  return axios.post(`${basePath}/${apiVersion}/new-project`, data);
}
