import { TRoute } from "@/types/commonTypes";
import SignUpPage from "@/components/pages/SignUp";
import LoginPage from "@/components/pages/Login/LoginPage";
import ContactPage from "@/components/pages/contact/ContactPage";

/**
 * Header, footer의 layout, basic background image가 필요한 페이지
 * 라우트할 페이지의 path, component
 */
// TODO: route 개선
export const BACKGROUND_ROUTES: TRoute[] = [
  {
    name: "로그인 페이지",
    path: "/login",
    component: LoginPage,
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
