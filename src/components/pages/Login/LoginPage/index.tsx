import LoginTemplate from "@/components/templates/Login";
import { loginState, redirectUrl } from "@/recoil";
import SeoMetaTag from "@/utils/SeoMetaTag";
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

  return (
    <>
      <SeoMetaTag
        title={"로그인"}
        description={"업브렐라 서비스 이용을 위한 로그인 페이지입니다."}
        keywords={", 로그인, login"}
      />
      {!isLogin && <LoginTemplate onClick={handleLogin} />}
    </>
  );
};
export default LoginPage;
