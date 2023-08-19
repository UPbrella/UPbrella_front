import RentHistoryPage from "@/components/pages/admin/RentHistoryPage";
import StoreManagePage from "@/components/pages/admin/store/StoreManagePage";
import { TRoute } from "@/types/commonTypes";

export const ADMIN_ROUTES: TRoute[] = [
  {
    name: "어드민 협업 지점 관리 페이지",
    path: "/admin/stores",
    component: StoreManagePage,
  },
  {
    name: "어드민 대여/반납 페이지",
    path: "/admin/rent-history",
    component: RentHistoryPage,
  },
];
