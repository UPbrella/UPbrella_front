import { $axios } from "@/lib/axios";
import { useEffect } from "react";

const LoginRedirect = () => {
  useEffect(() => {
    login();
  }, []);
  const login = async () => {
    const code = new URL(window.location.href).searchParams.get("code");

    const res = await $axios.get(`/users/login?code=${code}`);
    return res.data;
  };

  return;
};
export default LoginRedirect;
