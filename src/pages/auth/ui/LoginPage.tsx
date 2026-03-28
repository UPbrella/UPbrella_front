import LoginTemplate from "@/features/auth/ui/LoginTemplate";
import { loginState, redirectUrl } from "@/features/auth";
import SeoMetaTag from "@/shared/ui/SeoMetaTag";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { $axios } from "@/shared/api";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

interface NavigatorStandalone extends Navigator {
  standalone?: boolean;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useRecoilState<boolean>(loginState);
  const queryClient = useQueryClient();
  const Rest_api_key = import.meta.env.VITE_KAKAO_LOGIN_REST_API_KEY; //REST API KEY
  const redirect_uri = `${window.location.origin}/auth`; //Redirect URI

  const apple_client_id = import.meta.env.VITE_APPLE_CLIENT_ID; // Apple Client ID
  const apple_redirect_uri =
    import.meta.env.VITE_APPLE_REDIRECT_URI || `${import.meta.env.VITE_API_URL}/auth/apple`; // Apple Redirect URI (백엔드 API)

  // TODO - 로그인 리다이렉트
  const path = useRecoilValue(redirectUrl);

  useEffect(() => {
    if (isLogin) {
      navigate(path);
    }
  }, [path, isLogin, navigate]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const appleSuccess = urlParams.get("apple");
    const error = urlParams.get("error");

    if (error) {
      const errorMessages: { [key: string]: string } = {
        apple_login_failed: t("toast.error.appleLoginFailed"),
        no_id_token: t("toast.error.noIdToken"),
        server_error: t("toast.error.serverError"),
      };
      toast.error(errorMessages[error] || t("toast.error.loginFailed"));
      window.history.replaceState({}, "", window.location.pathname);
      return;
    }

    if (appleSuccess === "success") {
      $axios
        .post("/users/login")
        .then(() => {
          setIsLogin(true);
          queryClient.invalidateQueries();
          toast.success(t("toast.success.appleLogin"));
          navigate(path);
        })
        .catch((err) => {
          if (err.response?.data.code === 400) {
            navigate("/members/signup/info");
          } else {
            toast.error(t("toast.error.loginFailed"));
          }
        });
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, [navigate, path, setIsLogin, queryClient, t]);

  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  const appleURL = `https://appleid.apple.com/auth/authorize?client_id=${apple_client_id}&redirect_uri=${apple_redirect_uri}&response_type=code&scope=name email&response_mode=form_post`;

  const handleKakaoLogin = () => {
    const isPWA =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as NavigatorStandalone).standalone === true;

    if (isPWA) {
      window.open(kakaoURL, "_self");
    } else {
      window.location.href = kakaoURL;
    }
  };

  const handleAppleLogin = () => {
    const isPWA =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as NavigatorStandalone).standalone === true;

    if (isPWA) {
      window.open(appleURL, "_self");
    } else {
      window.location.href = appleURL;
    }
  };

  return (
    <>
      <SeoMetaTag
        title={t("seo.login.title")}
        description={t("seo.login.desc")}
        keywords={t("seo.login.keywords")}
      />
      {!isLogin && (
        <LoginTemplate onKakaoClick={handleKakaoLogin} onAppleClick={handleAppleLogin} />
      )}
    </>
  );
};
export default LoginPage;
