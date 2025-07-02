import { $axios } from "@/lib/axios";
import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const loginState = atom({
  key: "loginState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const loginInfo = selector({
  key: "loginInfo",
  get: async () => {
    const response = await $axios.get("/users/loggedIn", { withCredentials: true });
    return response.data.data;
  },
});

export const redirectUrl = atom({
  key: "redirectUrl",
  default: "/",
  effects_UNSTABLE: [persistAtom],
});
