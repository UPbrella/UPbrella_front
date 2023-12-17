import InfoPage from "@/components/pages/Info/InfoPage";
import ContactPage from "@/components/pages/contact/ContactPage";
import ForbiddenPage from "@/components/pages/forbidden/ForbiddenPage";
import UpbrellaStoryPage from "@/components/pages/story/UpbrellaStoryPage";
import { TRoute } from "@/types/commonTypes";

export const BASIC_ROUTES_URL = {
  root: {
    name: "메인",
    path: () => "/",
    component: UpbrellaStoryPage,
  },
  story: {
    name: "업브렐라 이야기",
    path: () => "/about",
    component: UpbrellaStoryPage,
  },
  information: {
    name: "이용안내",
    path: () => "/information",
    component: InfoPage,
  },
  contact: {
    name: "contact us",
    path: () => "/contact",
    component: ContactPage,
  },
  forbidden: {
    name: "접근 금지 페이지",
    path: () => "/forbidden",
    component: ForbiddenPage,
  },
} as const;

export const BASIC_ROUTES: TRoute[] = Object.values(BASIC_ROUTES_URL);
