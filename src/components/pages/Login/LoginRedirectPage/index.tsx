import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginState, redirectUrl } from "@/recoil";
import { useKakaoLogin } from "@/hooks/queries/userQueries";

// kakao login redirect page
const LoginRedirect = () => {
  const navigate = useNavigate();
  const [isLogin] = useRecoilState<boolean>(loginState);

  const { mutate: kakaoLogin } = useKakaoLogin();
  const path = useRecoilValue(redirectUrl);

  useEffect(() => {
    kakaoLogin();
  }, [kakaoLogin]);

  useEffect(() => {
    if (isLogin) {
      navigate(path);
    }
  }, [path, isLogin, navigate]);

  return <div></div>;
};
export default LoginRedirect;
