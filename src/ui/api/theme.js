import { basePath, apiVersion } from "./config";
const axios = require("axios").default;

export function newTheme(data) {
    console.log("La data es:", data);
    return axios.post(`${basePath}/${apiVersion}/theme/new-theme`, data);
}

export function listTheme() {
    return axios.get(`${basePath}/${apiVersion}/theme/list-theme`);
}