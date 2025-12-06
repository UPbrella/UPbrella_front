import LoginTemplate from "@/components/templates/Login";
import { loginState, redirectUrl } from "@/recoil";
import SeoMetaTag from "@/utils/SeoMetaTag";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { $axios } from "@/lib/axios";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

interface NavigatorStandalone extends Navigator {
  standalone?: boolean;
}

const LoginPage = () => {
  const navigate = useNavigate();
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

  // Apple 로그인 성공 처리
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const appleSuccess = urlParams.get("apple");
    const error = urlParams.get("error");

    if (error) {
      const errorMessages: { [key: string]: string } = {
        apple_login_failed: "Apple 로그인에 실패했습니다.",
        no_id_token: "Apple ID 토큰을 받지 못했습니다.",
        server_error: "서버 오류가 발생했습니다.",
      };
      toast.error(errorMessages[error] || "로그인에 실패했습니다.");
      // 에러 파라미터 제거
      window.history.replaceState({}, "", window.location.pathname);
      return;
    }

    if (appleSuccess === "success") {
      // 업브렐라 로그인 호출
      $axios
        .post("/users/login")
        .then(() => {
          setIsLogin(true);
          // 로그인 성공 시 모든 쿼리 무효화하여 데이터 다시 로드
          queryClient.invalidateQueries();
          toast.success("Apple 로그인 성공!");
          navigate(path);
        })
        .catch((err) => {
          if (err.response?.data.code === 400) {
            // 회원가입 필요
            navigate("/members/signup/info");
          } else {
            toast.error("로그인에 실패했습니다.");
          }
        });
      // 쿼리 파라미터 제거
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, [navigate, path, setIsLogin, queryClient]);

  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  const appleURL = `https://appleid.apple.com/auth/authorize?client_id=${apple_client_id}&redirect_uri=${apple_redirect_uri}&response_type=code&scope=name email&response_mode=form_post`;

  const handleKakaoLogin = () => {
    // iOS PWA에서 Done 탭 모달 방지를 위해 window.open 사용
    const isPWA =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as NavigatorStandalone).standalone === true;

    if (isPWA) {
      // PWA 환경에서는 같은 창에서 열기 (_self)
      window.open(kakaoURL, "_self");
    } else {
      window.location.href = kakaoURL;
    }
  };

  const handleAppleLogin = () => {
    // iOS PWA에서 Done 탭 모달 방지를 위해 window.open 사용
    const isPWA =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as NavigatorStandalone).standalone === true;

    if (isPWA) {
      // PWA 환경에서는 같은 창에서 열기 (_self)
      window.open(appleURL, "_self");
    } else {
      window.location.href = appleURL;
    }
  };

  return (
    <>
      <SeoMetaTag
        title={"로그인"}
        description={"업브렐라 서비스 이용을 위한 로그인 페이지입니다."}
        keywords={", 로그인, login"}
      />
      {!isLogin && (
        <LoginTemplate onKakaoClick={handleKakaoLogin} onAppleClick={handleAppleLogin} />
      )}
    </>
  );
};
export default LoginPage;
