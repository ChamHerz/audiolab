import { basePath, apiVersion } from "./config";
const axios = require("axios").default;

export function newAudio(data) {
  return axios.post(`${basePath}/${apiVersion}/audio/new-audio`, data);
}

export function listAudio() {
  return axios.get(`${basePath}/${apiVersion}/audio/list-audio`);
}

export function listAudioByProject(projectId) {
  return axios.get(
    `${basePath}/${apiVersion}/audio/list-audio-by-project/${projectId}`
  );
}

export function deleteAudioById(audioId) {
  return axios.put(
    `${basePath}/${apiVersion}/audio/delete-audio-by-id/${audioId}`
  );
}

export function createDataAudioById(audioId) {
  return axios.put(
    `${basePath}/${apiVersion}/audio/create-data-audio-by-id/${audioId}`
  );
}

export function addInterlocutorToAudio(audioId, interlocutor) {
  return axios.put(
    `${basePath}/${apiVersion}/audio/add-interlocutor-to-audio/${audioId}`,
    interlocutor
  );
}
