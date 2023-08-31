import { $axios } from "@/lib/axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginRedirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    login();
  });
  const login = async () => {
    const code = new URL(window.location.href).searchParams.get("code");

    await $axios.get(`/users/oauth/login?code=${code}`);

    const res = await $axios.get(`/users/login`, { withCredentials: true }).catch((error) => {
      // 회원가입이 필요한 회원의 경우 400 응답, 존재하지 않는 회원입니다.라는 메세지
      if (error.response.data.message == "존재하지 않는 회원입니다.") {
        navigate("/members/signup/info");
      }
      // 위 경우가 아닌 400 응답은, 비정상적인 응답
      else {
        alert("잘못된 요청입니다. 다시 로그인 해주세요.");
        navigate("/login");
      }
    });
    if (res) {
      alert("로그인 완료!");
      navigate("/");
    }
  };

  return <div>Loading</div>;
};
export default LoginRedirect;
