import type { TRoute } from "@/shared/model/types";

import UmbrellaFeedBackPage from "@/pages/admin/feedback/ui/UmbrellaFeedBackPage";
import LockerAdminPage from "@/pages/admin/locker/ui/LockerAdminPage";
import RentHistoryPage from "@/pages/admin/rent/ui/RentHistoryPage";
import StoreManagePage from "@/pages/admin/store/ui/StoreManagePage";
import UmbrellaAdminPage from "@/pages/admin/umbrella/ui/UmbrellaAdminPage";
import UserAdminPage from "@/pages/admin/user/ui/UserAdminPage";

import RentalLocationPage from "@/pages/rental-location/ui/RentalLocationPage";
import RentalOfficePage from "@/pages/rental-office/ui/RentalOfficePage";
import OfficeDetailPage from "@/pages/rental-office/ui/OfficeDetailPage";
import MypageRentPage from "@/pages/mypage/ui/MypageRentPage";
import MypageAccountPage from "@/pages/mypage/ui/MypageAccountPage";
import MypageInfoPage from "@/pages/mypage/ui/MypageInfoPage";
import MypageContactPage from "@/pages/mypage/ui/MypageContactPage";
import TermsOfService from "@/pages/tos/ui/TermsOfService";
import PrivacyPolicy from "@/pages/pp/ui/PrivacyPolicy";

import RentPage from "@/pages/rent/ui/RentFormPage";
import ReturnPage from "@/pages/return/ui/ReturnFormPage";

import LoginPage from "@/pages/auth/ui/LoginPage";
import LoginRedirect from "@/pages/auth/ui/LoginRedirectPage";
import AppleLoginRedirect from "@/pages/auth/ui/AppleLoginRedirectPage";
import SignUpPage from "@/pages/auth/ui/SignUpPage";

import InfoPage from "@/pages/info/ui/InfoPage";
import ContactPage from "@/pages/contact/ui/ContactPage";
import ForbiddenPage from "@/pages/forbidden/ui/ForbiddenPage";
import UpbrellaStoryPage from "@/pages/story/ui/UpbrellaStoryPage";

// Admin routes
export const ADMIN_ROUTES_URL = {
  rent: {
    name: "admin.menu.rent",
    path: () => "/admin/rent-history",
    component: RentHistoryPage,
  },
  umbrella: {
    name: "admin.menu.umbrella",
    path: () => "/admin/umbrellas",
    component: UmbrellaAdminPage,
  },
  user: {
    name: "admin.menu.user",
    path: () => "/admin/users",
    component: UserAdminPage,
  },
  feedback: {
    name: "admin.menu.feedback",
    path: () => "/admin/feedback",
    component: UmbrellaFeedBackPage,
  },
  store: {
    name: "admin.menu.store",
    path: () => "/admin/stores",
    component: StoreManagePage,
  },
  locker: {
    name: "admin.menu.locker",
    path: () => "/admin/locker",
    component: LockerAdminPage,
  },
} as const;

export const ADMIN_ROUTES: TRoute[] = Object.values(ADMIN_ROUTES_URL);

// Layout routes (with header/footer)
export const LAYOUT_ROUTES_URL = {
  rentalLocation: {
    name: "routes.layout.rentalLocation",
    path: () => "/rentalLocation",
    component: RentalLocationPage,
  },
  rentalOffice: {
    name: "routes.layout.rentalOffice",
    path: () => "/rentalOffice",
    component: RentalOfficePage,
  },
  rentalOfficeDetail: {
    name: "routes.layout.rentalOfficeDetail",
    path: (id = ":id") => `/rentalOffice/${id}`,
    component: OfficeDetailPage,
  },
  myPageRent: {
    name: "routes.layout.mypage.rent",
    path: () => "/members/mypage/rent",
    component: MypageRentPage,
  },
  myPageAccount: {
    name: "routes.layout.mypage.account",
    path: () => "/members/mypage/account",
    component: MypageAccountPage,
  },
  myPageInfo: {
    name: "routes.layout.mypage.info",
    path: () => "/members/mypage/info",
    component: MypageInfoPage,
  },
  myPageContact: {
    name: "routes.layout.mypage.contact",
    path: () => "/members/mypage/contact",
    component: MypageContactPage,
  },
  infoTos: {
    name: "routes.layout.infoTos",
    path: () => "/info/tos",
    component: TermsOfService,
  },
  infoPp: {
    name: "routes.layout.infoPp",
    path: () => "/info/pp",
    component: PrivacyPolicy,
  },
} as const;

export const LAYOUT_ROUTES: TRoute[] = Object.values(LAYOUT_ROUTES_URL);

// Not layout routes (no header/footer, behind auth)
const NOT_LAYOUT_ROUTES_URL = {
  rent: {
    name: "routes.notLayout.rentForm",
    path: (id = ":id") => `/rent/form/${id}`,
    component: RentPage,
  },
  return: {
    name: "routes.notLayout.returnForm",
    path: () => "/return/form",
    component: ReturnPage,
  },
} as const;

export const NOT_LAYOUT_ROUTES: TRoute[] = Object.values(NOT_LAYOUT_ROUTES_URL);

// Background image routes
export const BACKGROUND_IMAGE_ROUTES_URL = {
  login: {
    name: "routes.bgImage.login",
    path: () => "/login",
    component: LoginPage,
  },
  appleAuth: {
    name: "routes.bgImage.appleAuth",
    path: () => "/auth/apple",
    component: AppleLoginRedirect,
  },
  auth: {
    name: "routes.bgImage.auth",
    path: () => "/auth",
    component: LoginRedirect,
  },
  signup: {
    name: "routes.bgImage.signup",
    path: () => "/members/signup/info",
    component: SignUpPage,
  },
} as const;

export const BACKGROUND_IMAGE_ROUTES: TRoute[] = Object.values(BACKGROUND_IMAGE_ROUTES_URL);

// Basic routes (full width, no layout)
export const BASIC_ROUTES_URL = {
  root: {
    name: "routes.basic.main",
    path: () => "/",
    component: UpbrellaStoryPage,
  },
  story: {
    name: "routes.basic.story",
    path: () => "/about",
    component: UpbrellaStoryPage,
  },
  information: {
    name: "routes.basic.info",
    path: () => "/information",
    component: InfoPage,
  },
  contact: {
    name: "routes.basic.contact",
    path: () => "/contact",
    component: ContactPage,
  },
  forbidden: {
    name: "routes.basic.forbidden",
    path: () => "/forbidden",
    component: ForbiddenPage,
  },
} as const;

export const BASIC_ROUTES: TRoute[] = Object.values(BASIC_ROUTES_URL);
