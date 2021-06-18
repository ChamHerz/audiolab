import { basePath, apiVersion } from "./config";
const axios = require("axios").default;

export function newIpp(ipp) {
  return axios.post(`${basePath}/${apiVersion}/ipp/new-ipp`, ipp);
}

export function listIpp() {
  return axios.get(`${basePath}/${apiVersion}/ipp/list-ipp`);
}

export function deleteIpp(ipp) {
  return axios.put(`${basePath}/${apiVersion}/ipp/delete-ipp`, ipp);
}

export function updateIpp(ipp) {
  return axios.put(`${basePath}/${apiVersion}/ipp/update-ipp`, ipp);
}

export function updateProjectIpp(ipp) {
  return axios.put(`${basePath}/${apiVersion}/ipp/update-project-ipp`, ipp);
}
