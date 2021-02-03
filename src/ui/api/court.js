import { basePath, apiVersion } from "./config";
const axios = require("axios").default;

export function newCourt(data) {
    return axios.post(`${basePath}/${apiVersion}/court/new-court`, data);
}

export function listCourt() {
    return axios.get(`${basePath}/${apiVersion}/court/list-court`);
}