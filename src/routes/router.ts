import HomeMainPage from "@/pages/home/HomeMainPage";

/**
 * 라우트할 페이지의 path, component
 */
export const ROUTES = [
  {
    name: "메인 페이지",
    path: "/",
    component: HomeMainPage,
  },
] as const;
