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
  locker: {
    name: "보관함 관리",
    path: () => "/admin/locker",
    component: LockerAdminPage,
  },
} as const;

export const ADMIN_ROUTES: TRoute[] = Object.values(ADMIN_ROUTES_URL);

// Layout routes (with header/footer)
export const LAYOUT_ROUTES_URL = {
  rentalLocation: {
    name: "대여소 위치 페이지",
    path: () => "/rentalLocation",
    component: RentalLocationPage,
  },
  rentalOffice: {
    name: "협업지점 소개 페이지",
    path: () => "/rentalOffice",
    component: RentalOfficePage,
  },
  rentalOfficeDetail: {
    name: "협업 지점 상세 페이지",
    path: (id = ":id") => `/rentalOffice/${id}`,
    component: OfficeDetailPage,
  },
  myPageRent: {
    name: "마이페이지_이용내역",
    path: () => "/members/mypage/rent",
    component: MypageRentPage,
  },
  myPageAccount: {
    name: "마이페이지_계좌등록변경",
    path: () => "/members/mypage/account",
    component: MypageAccountPage,
  },
  myPageInfo: {
    name: "마이페이지_개인정보조회",
    path: () => "/members/mypage/info",
    component: MypageInfoPage,
  },
  myPageContact: {
    name: "마이페이지_문의하기",
    path: () => "/members/mypage/contact",
    component: MypageContactPage,
  },
  infoTos: {
    name: "이용약관 페이지",
    path: () => "/info/tos",
    component: TermsOfService,
  },
  infoPp: {
    name: "개인정보처리방침 페이지",
    path: () => "/info/pp",
    component: PrivacyPolicy,
  },
} as const;

export const LAYOUT_ROUTES: TRoute[] = Object.values(LAYOUT_ROUTES_URL);

// Not layout routes (no header/footer, behind auth)
const NOT_LAYOUT_ROUTES_URL = {
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
} as const;

export const NOT_LAYOUT_ROUTES: TRoute[] = Object.values(NOT_LAYOUT_ROUTES_URL);

// Background image routes
export const BACKGROUND_IMAGE_ROUTES_URL = {
  login: {
    name: "로그인 페이지",
    path: () => "/login",
    component: LoginPage,
  },
  appleAuth: {
    name: "애플 로그인 리다이렉트 페이지",
    path: () => "/auth/apple",
    component: AppleLoginRedirect,
  },
  auth: {
    name: "로그인 리다이렉트 페이지",
    path: () => "/auth",
    component: LoginRedirect,
  },
  signup: {
    name: "회원가입 정보 입력 페이지",
    path: () => "/members/signup/info",
    component: SignUpPage,
  },
} as const;

export const BACKGROUND_IMAGE_ROUTES: TRoute[] = Object.values(BACKGROUND_IMAGE_ROUTES_URL);

// Basic routes (full width, no layout)
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
