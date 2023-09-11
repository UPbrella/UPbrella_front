import RentHistoryPage from "@/components/pages/admin/rent/RentHistoryPage";
import StoreManagePage from "@/components/pages/admin/store/StoreManagePage";
import UserAdminPage from "@/components/pages/admin/user/UserAdminPage";
import { TRoute } from "@/types/commonTypes";

export const ADMIN_ROUTES_URL = {
  store: {
    name: "어드민 협업 지점 관리 페이지",
    path: "/admin/stores",
    component: StoreManagePage,
  },
  rent: {
    name: "어드민 대여/반납 페이지",
    path: "/admin/rent-history",
    component: RentHistoryPage,
  },
  user: {
    name: "어드민 회원관리 페이지",
    path: "/admin/users",
    component: UserAdminPage,
  },
} as const;

export const ADMIN_ROUTES: TRoute[] = Object.values(ADMIN_ROUTES_URL);
