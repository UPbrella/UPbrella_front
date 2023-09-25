import ForbiddenPage from "@/components/pages/forbidden/ForbiddenPage";
import RentPage from "@/components/pages/rent";
import ReturnPage from "@/components/pages/return";
import TempPage from "@/components/pages/temp/TempPage";
import { TRoute } from "@/types/commonTypes";

/**
 * Header, footer의 layout이 필요없는 페이지
 * 라우트할 페이지의 path, component
 */
// TODO: route 개선
export const NOT_LAYOUT_ROUTES: TRoute[] = [
  {
    name: "대여폼 페이지",
    path: "rent/form/:id",
    component: RentPage,
  },
  {
    name: "반납폼 페이지",
    path: "/return/form",
    component: ReturnPage,
  },
  {
    name: "접근 금지 페이지",
    path: "/forbidden",
    component: ForbiddenPage,
  },
  {
    name: "메인 페이지",
    path: "/",
    component: TempPage,
  },
];
