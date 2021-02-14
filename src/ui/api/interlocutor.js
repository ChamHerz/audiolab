import { basePath, apiVersion } from "./config";
const axios = require("axios").default;

export function newInterlocutor(data) {
    return axios.post(`${basePath}/${apiVersion}/interlocutor/new-interlocutor`, data);
}

export function listInterlocutor() {
    return axios.get(`${basePath}/${apiVersion}/interlocutor/list-interlocutor`);
}

export function deleteInterlocutor(data) {
    return axios.put(`${basePath}/${apiVersion}/interlocutor/delete-interlocutor`, data);
}