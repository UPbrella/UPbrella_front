import UmbrellaFeedBackPage from "@/components/pages/admin/feedback/UmbrellaFeedBackPage";
import RentHistoryPage from "@/components/pages/admin/rent/RentHistoryPage";
import StoreManagePage from "@/components/pages/admin/store/StoreManagePage";
import UmbrellaAdminPage from "@/components/pages/admin/umbrella/UmbrellaAdminPage";
import UserAdminPage from "@/components/pages/admin/user/UserAdminPage";
import { TRoute } from "@/types/commonTypes";

export const ADMIN_ROUTES_URL = {
  rent: {
    name: "대여/반납 현황 테이블",
    path: () => "/admin/rent-history",
    component: RentHistoryPage,
  },
  umbrella: {
    name: "우산 관리",
    path: () => "/admin/umbrellas",
    component: UmbrellaAdminPage,
  },
  user: {
    name: "회원 관리",
    path: () => "/admin/users",
    component: UserAdminPage,
  },
  feedback: {
    name: "상태신고 / 개선사항 확인",
    path: () => "/admin/feedback",
    component: UmbrellaFeedBackPage,
  },
  store: {
    name: "협업 지점 관리",
    path: () => "/admin/stores",
    component: StoreManagePage,
  },
} as const;

export const ADMIN_ROUTES: TRoute[] = Object.values(ADMIN_ROUTES_URL);
