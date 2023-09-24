import LoginTemplate from "@/components/templates/Login";
import { loginState, redirectUrl } from "@/recoil";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLogin] = useRecoilState<boolean>(loginState);
  const Rest_api_key = import.meta.env.VITE_KAKAO_LOGIN_REST_API_KEY; //REST API KEY
  const redirect_uri = `${window.location.origin}/auth`; //Redirect URI

  // TODO - 로그인 리다이렉트
  const path = useRecoilValue(redirectUrl);

  useEffect(() => {
    if (isLogin) {
      navigate(path);
    }
  }, [path, isLogin, navigate]);

  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  return <>{!isLogin && <LoginTemplate onClick={handleLogin} />}</>;
};
export default LoginPage;
