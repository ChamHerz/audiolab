import { basePath, apiVersion} from "./config";
const axios = require("axios").default;

export function newCompany(data) {
    return axios.post(`${basePath}/${apiVersion}/company/new-company`, data);
}

export function listCompany() {
    return axios.post(`${basePath}/${apiVersion}/company/list-company`, data);
}