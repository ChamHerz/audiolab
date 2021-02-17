import { basePath, apiVersion } from "./config";
const axios = require("axios").default;

export function newTheme(data) {
    return axios.post(`${basePath}/${apiVersion}/theme/new-theme`, data);
}

export function listTheme() {
    return axios.get(`${basePath}/${apiVersion}/theme/list-theme`);
}

export function deleteTheme(data) {
    return axios.put(`${basePath}/${apiVersion}/theme/delete-theme`, data);
}

export function updateTheme(data) {
    return axios.put(`${basePath}/${apiVersion}/theme/update-theme`, data);
}