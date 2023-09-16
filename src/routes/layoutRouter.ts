import { TRoute } from "@/types/commonTypes";
import HomeMainPage from "@/components/pages/home/HomeMainPage";
import RentalLocationPage from "@/components/pages/RentalLocation/RentalLocationPage";
import RentalOfficePage from "@/components/pages/rentalOffice/RentalOfficePage";
import SignUpPage from "@/components/pages/SignUp";
import LoginPage from "@/components/pages/Login/LoginPage";
import LoginRedirect from "@/components/pages/Login/LoginRedirectPage";
import InfoPage from "@/components/pages/Info/InfoPage";
import MypageRentPage from "@/components/pages/Mypage/MypageRentPage";
import MypageAccountPage from "@/components/pages/Mypage/MypageAccountPage";


/**
 * Header, footer의 layout이 필요한 페이지
 * 라우트할 페이지의 path, component
 */
export const LAYOUT_ROUTES: TRoute[] = [
  {
    name: "메인 페이지",
    path: "/",
    component: HomeMainPage,
  },
  {
    name: "대여소 위치 페이지",
    path: "/rentalLocation",
    component: RentalLocationPage,
  },
  {
    name: "협업 지점 소개페이지",
    path: "/rentalOffice",
    component: RentalOfficePage,
  },
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
    name: "이용안내 페이지",
    path: "/information",
    component: InfoPage,
  }
    name: "마이페이지_이용내역",
    path: "/members/mypage/rent",
    component: MypageRentPage,
  },
  {
    name: "마이페이지_계좌등록변경",
    path: "/members/mypage/account",
    component: MypageAccountPage,
  },
];
