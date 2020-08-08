import { basePath, apiVersion } from "./config";
const axios = require("axios").default;

export function signUpApi(data) {
  return axios.post(`${basePath}/${apiVersion}/sign-up`, data);
}
