import { basePath, apiVersion } from "./config";
const axios = require("axios").default;

export function newSegment(segment) {
  return axios.post(`${basePath}/${apiVersion}/segment/new-segment`, segment);
}

export function getMaxId() {
  return axios.get(`${basePath}/${apiVersion}/segment/get-max-id`);
}

export function listSegmentByAudio(audioId) {
  return axios.get(
    `${basePath}/${apiVersion}/segment/list-segment-by-audio/${audioId}`
  );
}

export function deleteSegmentById(segmentId) {
  return axios.put(
    `${basePath}/${apiVersion}/segment/delete-segment-by-id/${segmentId}`
  );
}

export function updateSegment(segment) {
  return axios.put(`${basePath}/${apiVersion}/segment/update-segment`, segment);
}
