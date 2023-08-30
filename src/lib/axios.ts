import axios from "axios";
import qs from "qs";

export const $axios = axios.create({
  baseURL: "http://43.202.94.218:8080",
  timeout: 15000,
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: "repeat" });
  },
});
