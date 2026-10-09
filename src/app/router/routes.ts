import { lazy } from "react";
import type { TRoute } from "@/shared/model/types";

// 랜딩은 첫 화면이라 정적 import, 나머지는 방문 시 로드
import UpbrellaStoryPage from "@/pages/story/ui/UpbrellaStoryPage";

const UmbrellaFeedBackPage = lazy(() => import("@/pages/admin/feedback/ui/UmbrellaFeedBackPage"));
const LockerAdminPage = lazy(() => import("@/pages/admin/locker/ui/LockerAdminPage"));
const RentHistoryPage = lazy(() => import("@/pages/admin/rent/ui/RentHistoryPage"));
const StoreManagePage = lazy(() => import("@/pages/admin/store/ui/StoreManagePage"));
const UmbrellaAdminPage = lazy(() => import("@/pages/admin/umbrella/ui/UmbrellaAdminPage"));
const UserAdminPage = lazy(() => import("@/pages/admin/user/ui/UserAdminPage"));

const RentalLocationPage = lazy(() => import("@/pages/rental-location/ui/RentalLocationPage"));
const RentalOfficePage = lazy(() => import("@/pages/rental-office/ui/RentalOfficePage"));
const OfficeDetailPage = lazy(() => import("@/pages/rental-office/ui/OfficeDetailPage"));
const MypageRentPage = lazy(() => import("@/pages/mypage/ui/MypageRentPage"));
const MypageAccountPage = lazy(() => import("@/pages/mypage/ui/MypageAccountPage"));
const MypageInfoPage = lazy(() => import("@/pages/mypage/ui/MypageInfoPage"));
const MypageContactPage = lazy(() => import("@/pages/mypage/ui/MypageContactPage"));
const TermsOfService = lazy(() => import("@/pages/tos/ui/TermsOfService"));
const PrivacyPolicy = lazy(() => import("@/pages/pp/ui/PrivacyPolicy"));

const RentPage = lazy(() => import("@/pages/rent/ui/RentFormPage"));
const ReturnPage = lazy(() => import("@/pages/return/ui/ReturnFormPage"));

const LoginPage = lazy(() => import("@/pages/auth/ui/LoginPage"));
const LoginRedirect = lazy(() => import("@/pages/auth/ui/LoginRedirectPage"));
const AppleLoginRedirect = lazy(() => import("@/pages/auth/ui/AppleLoginRedirectPage"));
const SignUpPage = lazy(() => import("@/pages/auth/ui/SignUpPage"));

const InfoPage = lazy(() => import("@/pages/info/ui/InfoPage"));
const ContactPage = lazy(() => import("@/pages/contact/ui/ContactPage"));
const ForbiddenPage = lazy(() => import("@/pages/forbidden/ui/ForbiddenPage"));
const QrScanPage = lazy(() => import("@/pages/qr-scan/ui/QrScanPage"));

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
  qrScan: {
    name: "routes.layout.qrScan",
    path: () => "/qr-scan",
    component: QrScanPage,
  },
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
export const NOT_LAYOUT_ROUTES_URL = {
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
