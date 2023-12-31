import LoginPage from "@/components/pages/Login/LoginPage";
import LoginRedirect from "@/components/pages/Login/LoginRedirectPage";
import SignUpPage from "@/components/pages/SignUp";
import { TRoute } from "@/types/commonTypes";

export const BACKGROUND_IMAGE_ROUTES_URL = {
  login: {
    name: "로그인 페이지",
    path: () => "/login",
    component: LoginPage,
  },
  auth: {
    name: "로그인 리다이렉트 페이지",
    path: () => "/auth",
    component: LoginRedirect,
  },
  signup: {
    name: "회원가입 정보 입력 페이지",
    path: () => "/members/signup/info",
    component: SignUpPage,
  },
} as const;

export const BACKGROUND_IMAGE_ROUTES: TRoute[] = Object.values(BACKGROUND_IMAGE_ROUTES_URL);
