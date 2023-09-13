import LoginTemplate from "@/components/templates/Login";

const LoginPage = () => {
  const Rest_api_key = import.meta.env.VITE_KAKAO_LOGIN_REST_API_KEY; //REST API KEY
  const redirect_uri = `${window.location.origin}/auth`; //Redirect URI
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  return <LoginTemplate onClick={handleLogin} />;
};
export default LoginPage;
