import { basePath, apiVersion } from "./config";
const axios = require("axios").default;

export function newLabel(label) {
  return axios.post(`${basePath}/${apiVersion}/label/new-label`, label);
}

export function getMaxId() {
  return axios.get(`${basePath}/${apiVersion}/label/get-max-id`);
}

export function listLabelByAudio(audioId) {
  return axios.get(
    `${basePath}/${apiVersion}/label/list-label-by-audio/${audioId}`
  );
}

export function deleteLabelById(labelId) {
  return axios.put(
    `${basePath}/${apiVersion}/label/delete-label-by-id/${labelId}`
  );
}
