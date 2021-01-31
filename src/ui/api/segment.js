import { basePath, apiVersion } from "./config";
const axios = require("axios").default;

export function newSegment(segment) {
  return axios.post(`${basePath}/${apiVersion}/segment/new-segment`, segment);
}

export function getMaxId() {
  return axios.get(`${basePath}/${apiVersion}/segment/get-max-id`);
}
