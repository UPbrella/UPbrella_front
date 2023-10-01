import LoginPage from "@/components/pages/Login/LoginPage";
import LoginRedirect from "@/components/pages/Login/LoginRedirectPage";
import SignUpPage from "@/components/pages/SignUp";
import ContactPage from "@/components/pages/contact/ContactPage";
import { TRoute } from "@/types/commonTypes";

export const BACKGROUND_IMAGE_ROUTES: TRoute[] = [
  {
    name: "로그인 페이지",
    path: "/login",
    component: LoginPage,
  },
  {
    name: "로그인 리다이렉트 페이지",
    path: "/auth",
    component: LoginRedirect,
  },
  {
    name: "회원가입 정보 입력 페이지",
    path: "/members/signup/info",
    component: SignUpPage,
  },
  {
    name: "CONTACT_US",
    path: "/contact",
    component: ContactPage,
  },
];
