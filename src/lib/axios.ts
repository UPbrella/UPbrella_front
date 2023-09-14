import axios from "axios";
import qs from "qs";

export const $axios = axios.create({
  // baseURL: import.meta.env.VITE_UPBRELLA_API_BASE_URL,
  baseURL: "/api",
  timeout: 15000,
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: "repeat" });
  },
});
