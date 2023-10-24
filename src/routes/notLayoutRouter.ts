import ForbiddenPage from "@/components/pages/forbidden/ForbiddenPage";
import RentPage from "@/components/pages/rent";
import ReturnPage from "@/components/pages/return";
import { TRoute } from "@/types/commonTypes";

/**
 * Header, footer의 layout이 필요없는 페이지
 * 라우트할 페이지의 path, component
 */
export const NOT_LAYOUT_ROUTES_URL = {
  rent: {
    name: "대여폼 페이지",
    path: (id = ":id") => `/rent/form/${id}`,
    component: RentPage,
  },
  return: {
    name: "반납폼 페이지",
    path: () => "/return/form",
    component: ReturnPage,
  },
  forbidden: {
    name: "접근 금지 페이지",
    path: () => "/forbidden",
    component: ForbiddenPage,
  },
} as const;

export const NOT_LAYOUT_ROUTES: TRoute[] = Object.values(NOT_LAYOUT_ROUTES_URL);
