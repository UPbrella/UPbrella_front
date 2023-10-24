import { TRoute } from "@/types/commonTypes";
import RentalLocationPage from "@/components/pages/RentalLocation/RentalLocationPage";
import RentalOfficePage from "@/components/pages/rentalOffice/RentalOfficePage";
import MypageRentPage from "@/components/pages/Mypage/MypageRentPage";
import MypageAccountPage from "@/components/pages/Mypage/MypageAccountPage";
import MypageInfoPage from "@/components/pages/Mypage/MypageInfoPage";
import TermsOfService from "@/components/pages/tos";
import PrivacyPolicy from "@/components/pages/pp";
import OfficeDetailPage from "@/components/pages/officeDetail/OfficeDetailPage";
import MypageContactPage from "@/components/pages/Mypage/MypageContactPage";

/**
 * Header, footer의 layout이 필요한 페이지
 * 라우트할 페이지의 path, component
 */
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
