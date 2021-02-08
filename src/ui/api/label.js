import { basePath, apiVersion } from "./config";
const axios = require("axios").default;

export function newLabel(label) {
  return axios.post(`${basePath}/${apiVersion}/label/new-label`, label);
}

export function getMaxId() {
  return axios.get(`${basePath}/${apiVersion}/label/get-max-id`);
}
