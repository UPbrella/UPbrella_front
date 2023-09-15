import RentPage from "@/components/pages/rent";
import ReturnPage from "@/components/pages/return";
import { TRoute } from "@/types/commonTypes";

/**
 * Header, footer의 layout이 필요없는 페이지
 * 라우트할 페이지의 path, component
 */
export const NOT_LAYOUT_ROUTES: TRoute[] = [
  {
    name: "대여폼 페이지",
    path: "rent/form/:umbrellaId",
    component: RentPage,
  },
  {
    name: "반납폼 페이지",
    path: "/return/form",
    component: ReturnPage,
  },
];
