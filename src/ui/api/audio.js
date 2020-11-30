import { basePath, apiVersion } from "./config";
const axios = require("axios").default;

export function newAudio(data) {
  return axios.post(`${basePath}/${apiVersion}/audio/new-audio`, data);
}

export function listAudio() {
  return axios.get(`${basePath}/${apiVersion}/audio/list-audio`);
}
