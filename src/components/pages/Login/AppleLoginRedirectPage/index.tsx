import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginState, redirectUrl } from "@/recoil";
import { useAppleLogin } from "@/hooks/queries/userQueries";

// apple login redirect page
const AppleLoginRedirect = () => {
  const navigate = useNavigate();
  const [isLogin] = useRecoilState<boolean>(loginState);

  const { mutate: appleLogin } = useAppleLogin();
  const path = useRecoilValue(redirectUrl);

  useEffect(() => {
    appleLogin();
  }, [appleLogin]);

  useEffect(() => {
    if (isLogin) {
      navigate(path);
    }
  }, [path, isLogin, navigate]);

  return <div>로그인 중...</div>;
};
export default AppleLoginRedirect;
