import axios from "axios";
import qs from "qs";

export const $axios = axios.create({
  baseURL: import.meta.env.DEV
    ? import.meta.env.VITE_UPBRELLA_API_BASE_URL_DEV
    : import.meta.env.VITE_UPBRELLA_API_BASE_URL_PROD,
  timeout: 15000,
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: "repeat" });
  },
});
