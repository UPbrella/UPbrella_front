import { TRoute } from "@/types/commonTypes";
import HomeMainPage from "@/components/pages/home/HomeMainPage";
import RentHistoryPage from "@/components/pages/admin/RentHistoryPage";
import RentalLocationPage from "@/components/pages/RentalLocation/RentalLocationPage";
import StoreManagePage from "@/components/pages/admin/store/StoreManagePage";
import LoginPage from "@/components/pages/Login/LoginPage";
import LoginRedirect from "@/components/pages/Login/LoginRedirectPage";

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
    name: "어드민 대여/반납 페이지",
    path: "/admin/rent-history",
    component: RentHistoryPage,
  },
  {
    name: "어드민 협업 지점 관리 페이지",
    path: "/admin/stores",
    component: StoreManagePage,
  },
  {
    name: "대여소 위치 페이지",
    path: "/rentalLocation",
    component: RentalLocationPage,
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
];
