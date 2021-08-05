import { basePath, apiVersion } from "./config";
const axios = require("axios").default;

export function newProject(data) {
  return axios.post(`${basePath}/${apiVersion}/project/new-project`, data);
}

export function listProject() {
  return axios.get(`${basePath}/${apiVersion}/project/list-project`);
}

export function findAllByIpp(ippId) {
  return axios.get(
    `${basePath}/${apiVersion}/project/find-all-by-ipp/${ippId}`
  );
}

export function addIppToProject(ipp, projectId) {
  return axios.post(
    `${basePath}/${apiVersion}/project/add-ipp-to-project/${projectId}`,
    ipp
  );
}

export function deleteProject(projectId) {
  return axios.delete(
    `${basePath}/${apiVersion}/project/delete-project/${projectId}`
  );
}
