import { $axios } from "@/lib/axios";
import { atom, selector } from "recoil";

export type TUserInfo = {
  id: number;
  name: string;
  phoneNumber: string;
  bank?: string;
  accountNumber?: string;
};

export const userInfo = atom<TUserInfo>({
  key: "userInfo",
  default: {
    id: 0,
    name: "",
    phoneNumber: "",
    bank: "",
    accountNumber: "",
  },
});
export const loginInfo = selector({
  key: "loginInfo",
  get: async () => {
    const response = await $axios.get("/users/loggedIn", { withCredentials: true });
    return response.data.data;
  },
});

export const rentHistories = selector({
  key: "rentHistories",
  get: async () => {
    const response = await $axios.get("/users/histories", { withCredentials: true });
    return response.data.data.histories;
  },
});
