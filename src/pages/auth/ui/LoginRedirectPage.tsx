import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/features/auth";
import { useKakaoLogin } from "@/entities/user/api/user.queries";

// kakao login redirect page
const LoginRedirect = () => {
  const navigate = useNavigate();
  const isLogin = useAuthStore((s) => s.isLogin);

  const { mutate: kakaoLogin } = useKakaoLogin();
  const path = useAuthStore((s) => s.redirectUrl);

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
