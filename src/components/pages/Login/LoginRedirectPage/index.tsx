import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginState } from "@/recoil";
import { useKakaoLogin } from "@/hooks/queries/userQueries";

// kakao login redirect page
const LoginRedirect = () => {
  const navigate = useNavigate();
  const [isLogin] = useRecoilState<boolean>(loginState);
  const { state } = useLocation();

  const { mutate: kakaoLogin } = useKakaoLogin();

  useEffect(() => {
    kakaoLogin();
  }, [kakaoLogin]);

  useEffect(() => {
    if (isLogin) {
      state ? navigate(state) : navigate("/");
    }
  }, [state, isLogin, navigate]);

  return <div></div>;
};
export default LoginRedirect;
