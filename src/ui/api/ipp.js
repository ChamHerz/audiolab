import { basePath, apiVersion } from "./config";
const axios = require("axios").default;

export function newIpp(ipp) {
  return axios.post(`${basePath}/${apiVersion}/ipp/new-ipp`, ipp);
}
