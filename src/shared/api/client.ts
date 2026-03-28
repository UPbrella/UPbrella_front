import axios from "axios";
import qs from "qs";
import { mockAdapter } from "@/shared/mocks";

const isMockMode = import.meta.env.VITE_MOCK_MODE === "true";

export const $axios = axios.create({
  baseURL: import.meta.env.VITE_UPBRELLA_API_BASE_URL,
  timeout: 15000,
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: "repeat" });
  },
  withCredentials: true,
  ...(isMockMode && { adapter: mockAdapter }),
});
