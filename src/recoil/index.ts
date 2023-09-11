import { $axios } from "@/lib/axios";
import { selector } from "recoil";

export const loginInfo = selector({
  key: "loginInfo",
  get: async () => {
    const response = await $axios.get("/users/loggedIn", { withCredentials: true });

    return response.data.data;
  },
});
