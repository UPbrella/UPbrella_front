import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginState, redirectUrl } from "@/features/auth";
import { useAppleLogin } from "@/entities/user/api/user.queries";
import { useTranslation } from "react-i18next";

// apple login redirect page
const AppleLoginRedirect = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
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

  return <div>{t("auth.login.loading")}</div>;
};
export default AppleLoginRedirect;
