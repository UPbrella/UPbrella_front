# Upbrella Front — Atomic Design → FSD 마이그레이션 가이드

## 목차

1. [개요](#1-개요)
2. [현재 구조 분석](#2-현재-구조-분석)
3. [FSD 목표 구조](#3-fsd-목표-구조)
4. [매핑 테이블: 현재 → FSD](#4-매핑-테이블-현재--fsd)
5. [도메인 식별 및 슬라이스 설계](#5-도메인-식별-및-슬라이스-설계)
6. [단계별 마이그레이션 전략](#6-단계별-마이그레이션-전략)
7. [Phase 1: shared 레이어](#7-phase-1-shared-레이어)
8. [Phase 2: entities 레이어](#8-phase-2-entities-레이어)
9. [Phase 3: features 레이어](#9-phase-3-features-레이어)
10. [Phase 4: widgets 레이어](#10-phase-4-widgets-레이어)
11. [Phase 5: pages 레이어](#11-phase-5-pages-레이어)
12. [Phase 6: app 레이어](#12-phase-6-app-레이어)
13. [Import 규칙 및 Lint 설정](#13-import-규칙-및-lint-설정)
14. [체크리스트](#14-체크리스트)

---

## 1. 개요

### FSD(Feature-Sliced Design)란?

프론트엔드 아키텍처 방법론으로, 코드를 **레이어(Layer) → 슬라이스(Slice) → 세그먼트(Segment)** 3단계 계층으로 조직한다.

```
Layer       = app | pages | widgets | features | entities | shared
Slice       = 레이어 내 비즈니스 도메인 단위 (store, user, auth, ...)
Segment     = 슬라이스 내 기술 역할 (api/, model/, ui/, lib/)
```

핵심 원칙:

- **단방향 의존성**: 상위 레이어만 하위 레이어를 참조 (`app → pages → widgets → features → entities → shared`)
- **Public API**: 각 슬라이스는 `index.ts`를 통해서만 외부에 노출
- **Entities = GET/SEARCH + Query Factory**: 비즈니스 데이터 조회
- **Features = MUTATIONS (2+ 페이지에서 재사용)**: 사용자 액션/변경
- **Types**: 도메인 타입은 `entities/{name}/model/types.ts`에 위치

### 왜 마이그레이션 하는가?

| 문제 (Atomic Design) | 해결 (FSD) |
|---|---|
| atom/molecule/organism 경계가 모호 | 레이어별 책임이 명확하게 정의됨 |
| 도메인 로직이 여러 계층에 흩어짐 | 슬라이스 내에 api/model/ui가 응집됨 |
| 관련 파일을 찾으려면 여러 폴더를 탐색 | 하나의 슬라이스 폴더에 관련 코드가 모임 |
| import 경로가 기술 계층 기반이라 직관적이지 않음 | 도메인 기반 import로 의미가 명확함 |

### 기술 스택

| 영역 | 기술 |
|------|------|
| Build | Vite 4, `@vitejs/plugin-react-swc`, `vite-tsconfig-paths` |
| Styling | Tailwind 3 + MUI 5 + Emotion (hybrid) |
| Data | React Query v4, Axios (`$axios`), `TApiResponse<T>` |
| Forms | react-hook-form + Zod |
| State | Recoil + recoil-persist |
| Admin UI | PrimeReact tables/paginator |
| Maps | Naver Maps (`@types/navermaps`), Kakao (react-daum-postcode), Supercluster |
| PWA | vite-plugin-pwa (Workbox) |
| Env | `VITE_UPBRELLA_API_BASE_URL` (prod), `/api` proxy (dev) |

---

## 2. 현재 구조 분석

### 파일 규모

| 영역 | 파일 수 | 비고 |
|------|---------|------|
| components/atoms | 15폴더 | BottomSheet, Contact, DetailBtn, EmptyArea, FeedBackDataTable, Form, Header, InformTitle, LocationClassificationBtn, Login, MobileCardInfo, Mypage, NaverDirectionBtn, RentalLocationTitle, SignUp |
| components/molecules | 13폴더 | ContentsTitle, ErrorComponent, Footer, FormLocationMolecules, FormModal, MapBtn, MobileCard, MobileMenu, ModalHeader, Mypage, SelectBox, SignUp, Store |
| components/organisms | 14항목 | BankModal, Card, CardFooter, Footer, Header, ImgSwiper, Info, LoginForm, Modal, Mypage, NaverMap, PWAUpdatePrompt.tsx, RentalInfoCard, admin |
| components/templates | 4폴더 | Login, SignUp, admin, common |
| components/pages | 18영역 | admin(6 하위), Login(3), Mypage(5), rent, return, contact, ... |
| api | 8파일 | storeApi, umbrellaApi, clientUserApi, adminUserApi, formApi, rentHistoryApi, feedBackApi, lockerApi |
| hooks/queries | 7파일 | store, umbrella, user, rent, feedBack, form, locker |
| hooks/custom | 2파일 | usePaginator, useModalStatus |
| types | 13파일 | commonTypes, null.d.ts, admin/6종, contact, form, mypage, signup, stores |
| routes | 5파일 | admin, backgroundImage, basic, layout, notLayout |
| recoil | 1파일 | loginState, loginInfo, redirectUrl |
| schemas | 1파일 | signUpSchema |

### 현재 디렉토리 구조

```
src/
├── api/                        # 도메인별 API 함수
│   ├── storeApi.ts             # getStoreList, getStores, getStoreDetail, CRUD, classification CRUD
│   ├── umbrellaApi.ts          # getUmbrellas, CRUD, statistics
│   ├── clientUserApi.ts        # getClientRentHistories
│   ├── adminUserApi.ts         # getUsers, deleteUsers, getBlackUsers, patchAdminUsers
│   ├── formApi.ts              # getRentFormData, getReturnFormData, postRent, patchReturn
│   ├── rentHistoryApi.ts       # getRentHistories, patchHistoriesPayment/Refund
│   ├── feedBackApi.ts          # getHistoriesStatus, getHistoriesImprovements
│   └── lockerApi.ts            # getLockers, CRUD
├── assets/                     # 이미지, SVG (BankIcon, Rental, Return, Story)
├── components/
│   ├── atoms/                  # 최소 단위 UI (15개 도메인 폴더)
│   ├── molecules/              # atoms 조합 (13개 도메인 폴더)
│   ├── organisms/              # 큰 섹션 (14개 항목)
│   ├── templates/              # 레이아웃 셸 (4개 폴더)
│   └── pages/                  # 라우트 대상 페이지
├── constants/                  # Date, Account, BankIcon
├── hooks/
│   ├── queries/                # React Query 훅 (7개)
│   └── custom/                 # usePaginator, useModalStatus
├── lib/                        # axios 인스턴스 ($axios)
│   └── axios.ts
├── recoil/                     # loginState, loginInfo, redirectUrl
│   └── index.ts
├── routes/                     # 라우트 테이블 5개
├── schemas/                    # signUpSchema (Zod)
├── stories/                    # Storybook 데모
├── styles/                     # 폰트, 지도 CSS
│   ├── clusterMarker.css
│   ├── markerLabel.css
│   └── fonts/
├── types/                      # 도메인별 타입 (13파일)
│   ├── commonTypes.ts
│   ├── null.d.ts
│   ├── admin/                  # FeedBackTypes, RentTypes, StoreTypes, lockersTypes, umbrellaTypes, userTypes
│   ├── contact/ContactTypes.ts
│   ├── form/FormTypes.ts
│   ├── mypage/MypageTypes.ts
│   ├── signup/SignupTypes.ts
│   └── stores/StoresTypes.ts
├── utils/                      # 유틸리티, 라우트 가드
│   ├── AdminRoutes.tsx         # 관리자 가드
│   ├── PrivateRoutes.tsx       # 인증 가드
│   ├── SeoMetaTag.tsx          # SEO 메타 태그
│   ├── error.ts                # getErrorMessage
│   ├── locationUtils.ts        # getUserPosition, getDistanceFromLatLonInKm
│   ├── selectBox.ts            # createSelectItems
│   ├── utils.ts                # formatPhoneNumber, validateNumber 등
│   ├── admin/storeHelpers.tsx  # STORE_ADMIN_TABLE 컬럼 설정
│   └── map/                    # clusterMarkerUtils, mapHelper, markerCluster
├── App.tsx
├── main.tsx
├── index.css
└── vite-env.d.ts
```

---

## 3. FSD 목표 구조

```
src/
├── app/                              # 앱 진입점, 프로바이더, 라우터
│   ├── providers/
│   │   ├── QueryProvider.tsx
│   │   ├── ThemeProvider.tsx
│   │   └── index.ts
│   ├── router/
│   │   ├── routes.tsx                # 5개 라우트 파일 통합
│   │   ├── guards/
│   │   │   ├── PrivateRoute.tsx
│   │   │   └── AdminRoute.tsx
│   │   └── index.ts
│   ├── layouts/
│   │   ├── MainLayout.tsx
│   │   ├── BackgroundLayout.tsx
│   │   ├── AdminWrapper.tsx
│   │   └── index.ts
│   ├── styles/
│   │   ├── index.css
│   │   └── fonts/
│   ├── App.tsx
│   └── main.tsx
│
├── pages/                            # 라우트 단위 페이지 (조합만 담당)
│   ├── rental-location/
│   │   ├── ui/RentalLocationPage.tsx
│   │   └── index.ts
│   ├── rental-office/
│   │   ├── ui/RentalOfficePage.tsx, OfficeDetailPage.tsx
│   │   └── index.ts
│   ├── mypage/
│   │   ├── ui/MypageRentPage.tsx, MypageAccountPage.tsx, MypageInfoPage.tsx, MypageContactPage.tsx, MypageLayout.tsx
│   │   └── index.ts
│   ├── auth/
│   │   ├── ui/LoginPage.tsx, LoginRedirectPage.tsx, AppleLoginRedirectPage.tsx, SignUpPage.tsx
│   │   └── index.ts
│   ├── rent/
│   │   ├── ui/RentFormPage.tsx
│   │   └── index.ts
│   ├── return/
│   │   ├── ui/ReturnFormPage.tsx
│   │   └── index.ts
│   ├── admin/
│   │   ├── rent/ui/RentHistoryPage.tsx
│   │   ├── umbrella/ui/UmbrellaAdminPage.tsx
│   │   ├── user/ui/UserAdminPage.tsx
│   │   ├── feedback/ui/UmbrellaFeedBackPage.tsx
│   │   ├── store/ui/StoreManagePage.tsx
│   │   └── locker/ui/LockerAdminPage.tsx
│   ├── story/
│   │   ├── ui/UpbrellaStoryPage.tsx
│   │   └── index.ts
│   ├── info/
│   ├── contact/
│   ├── tos/
│   ├── pp/
│   ├── forbidden/
│   └── not-found/
│
├── widgets/                          # 독립적인 대형 UI 블록
│   ├── header/
│   │   ├── ui/HeaderContainer.tsx
│   │   └── index.ts
│   ├── footer/
│   │   ├── ui/Footer.tsx
│   │   └── index.ts
│   ├── naver-map/
│   │   ├── ui/NaverMap.tsx
│   │   ├── lib/clusterMarkerUtils.ts, mapHelper.ts, markerCluster.ts
│   │   └── index.ts
│   ├── image-swiper/
│   │   ├── ui/ImgSwiper.tsx
│   │   └── index.ts
│   └── pwa-prompt/
│       ├── ui/PWAUpdatePrompt.tsx
│       └── index.ts
│
├── features/                         # 사용자 액션/뮤테이션 단위
│   ├── auth/
│   │   ├── ui/LoginForm.tsx, SignUpForm.tsx, OAuthButtons.tsx
│   │   ├── model/
│   │   │   ├── auth-store.ts         # loginState, loginInfo, redirectUrl (Recoil)
│   │   │   └── signup-schema.ts      # Zod
│   │   ├── api/auth-api.ts           # 로그인/로그아웃/OAuth 관련
│   │   └── index.ts
│   ├── rent-form/
│   │   ├── ui/FormBasic.tsx, FormLocation.tsx, FormStatus.tsx, RentModals.tsx
│   │   ├── model/useRentForm.ts
│   │   ├── api/use-submit-rent.ts
│   │   └── index.ts
│   ├── return-form/
│   │   ├── ui/ReturnModal.tsx
│   │   ├── api/use-submit-return.ts
│   │   └── index.ts
│   ├── contact/
│   │   ├── ui/ContactForm.tsx
│   │   └── index.ts
│   ├── admin-store/
│   │   ├── ui/StoreTable.tsx, StoreFormModal.tsx
│   │   ├── model/storeHelpers.ts
│   │   ├── api/use-create-store.ts, use-update-store.ts, use-delete-store.ts
│   │   └── index.ts
│   ├── admin-umbrella/
│   │   ├── ui/UmbrellaModal.tsx, UmbrellaExcelButton.tsx
│   │   ├── api/use-create-umbrella.ts, use-update-umbrella.ts, use-delete-umbrella.ts
│   │   └── index.ts
│   ├── admin-user/
│   │   ├── api/use-delete-user.ts, use-patch-user.ts
│   │   └── index.ts
│   ├── admin-rent/
│   │   ├── model/helpers.ts
│   │   ├── api/use-patch-payment.ts, use-patch-refund.ts
│   │   └── index.ts
│   ├── admin-feedback/
│   │   └── index.ts
│   └── admin-locker/
│       ├── ui/LockerModal.tsx
│       ├── api/use-create-locker.ts, use-update-locker.ts, use-delete-locker.ts
│       └── index.ts
│
├── entities/                         # 비즈니스 데이터 (GET/SEARCH + Query Factory)
│   ├── store/
│   │   ├── api/
│   │   │   ├── store-api.ts          # 조회 API (getStoreList, getStores, getStoreDetail, ...)
│   │   │   └── store.queries.ts      # Query Factory
│   │   ├── model/types.ts            # TStoreAllRes, TStoreListDetail, classification 타입
│   │   ├── ui/StoreCard.tsx
│   │   └── index.ts
│   ├── umbrella/
│   │   ├── api/umbrella-api.ts, umbrella.queries.ts
│   │   ├── model/types.ts
│   │   └── index.ts
│   ├── user/
│   │   ├── api/user-api.ts, user.queries.ts
│   │   ├── model/types.ts
│   │   └── index.ts
│   ├── rent/
│   │   ├── api/rent-api.ts, rent.queries.ts
│   │   ├── model/types.ts
│   │   └── index.ts
│   ├── feedback/
│   │   ├── api/feedback-api.ts, feedback.queries.ts
│   │   ├── model/types.ts
│   │   └── index.ts
│   └── locker/
│       ├── api/locker-api.ts, locker.queries.ts
│       ├── model/types.ts
│       └── index.ts
│
└── shared/                           # 재사용 가능한 범용 코드 (비즈니스 로직 없음)
    ├── api/
    │   └── client.ts                 # $axios 인스턴스
    ├── config/
    │   ├── date.ts                   # DAY_OF_WEEK
    │   ├── account.ts                # BANK_NAME, ACCOUNT_NUMBER, ACCOUNT_NAME
    │   └── bank-icons.tsx            # BankIcon 매핑
    ├── lib/
    │   ├── error.ts                  # getErrorMessage
    │   ├── location-utils.ts         # getUserPosition, getDistanceFromLatLonInKm
    │   ├── select-box.ts             # createSelectItems
    │   └── utils.ts                  # formatPhoneNumber, validateNumber 등
    ├── model/
    │   ├── types.ts                  # TApiResponse, TRoute, TCustomError
    │   └── null.d.ts
    ├── ui/
    │   ├── BottomSheet/
    │   ├── EmptyArea/
    │   ├── DetailBtn/
    │   ├── InformTitle/
    │   ├── NaverDirectionBtn/
    │   ├── LocationClassificationBtn/
    │   ├── MobileCardInfo/
    │   ├── ContentsTitle/
    │   ├── ErrorComponent/
    │   ├── ModalHeader/
    │   ├── SelectBox/
    │   ├── Modal/
    │   ├── SeoMetaTag.tsx
    │   └── index.ts
    ├── hooks/
    │   ├── usePaginator.ts
    │   └── useModalStatus.tsx
    └── assets/
        └── images/                   # BankIcon SVG, Rental/Return/Story 이미지
```

---

## 4. 매핑 테이블: 현재 → FSD

### 최상위 디렉토리 매핑

| 현재 위치 | → FSD 위치 | 비고 |
|---|---|---|
| `main.tsx` | `app/main.tsx` | |
| `App.tsx` | `app/App.tsx` | |
| `index.css` | `app/styles/index.css` | |
| `lib/axios.ts` | `shared/api/client.ts` | `$axios` export |
| `constants/Date.ts` | `shared/config/date.ts` | |
| `constants/Account.ts` | `shared/config/account.ts` | |
| `constants/BankIcon.tsx` | `shared/config/bank-icons.tsx` | |
| `types/commonTypes.ts` | `shared/model/types.ts` | TApiResponse, TRoute 등 |
| `types/null.d.ts` | `shared/model/null.d.ts` | |
| `utils/error.ts` | `shared/lib/error.ts` | |
| `utils/locationUtils.ts` | `shared/lib/location-utils.ts` | |
| `utils/selectBox.ts` | `shared/lib/select-box.ts` | |
| `utils/utils.ts` | `shared/lib/utils.ts` | |
| `utils/PrivateRoutes.tsx` | `app/router/guards/PrivateRoute.tsx` | |
| `utils/AdminRoutes.tsx` | `app/router/guards/AdminRoute.tsx` | |
| `utils/SeoMetaTag.tsx` | `shared/ui/SeoMetaTag.tsx` | |
| `utils/map/*` | `widgets/naver-map/lib/` | 지도 유틸 3파일 |
| `utils/admin/storeHelpers.tsx` | `features/admin-store/model/storeHelpers.ts` | |
| `recoil/index.ts` | `features/auth/model/auth-store.ts` | loginState, loginInfo, redirectUrl |
| `routes/*` (5파일) | `app/router/routes.tsx` | 통합 |
| `schemas/signUpSchema.ts` | `features/auth/model/signup-schema.ts` | |
| `hooks/custom/*` | `shared/hooks/` | usePaginator, useModalStatus |
| `styles/fonts/` | `app/styles/fonts/` | |
| `styles/*.css` (map 관련) | `widgets/naver-map/` | clusterMarker.css, markerLabel.css |
| `assets/` | `shared/assets/images/` | |

### API + Query 훅 + 타입 통합 매핑

| API 파일 | Query 훅 | 타입 파일 | → FSD Entity |
|---|---|---|---|
| `api/storeApi.ts` | `hooks/queries/storeQueries.ts` | `types/admin/StoreTypes.ts` + `types/stores/StoresTypes.ts` | `entities/store/` |
| `api/umbrellaApi.ts` | `hooks/queries/umbrellaQueries.ts` | `types/admin/umbrellaTypes.ts` | `entities/umbrella/` |
| `api/clientUserApi.ts` + `api/adminUserApi.ts` | `hooks/queries/userQueries.ts` | `types/admin/userTypes.ts` + `types/signup/SignupTypes.ts` + `types/mypage/MypageTypes.ts` | `entities/user/` |
| `api/rentHistoryApi.ts` | `hooks/queries/rentQueries.ts` | `types/admin/RentTypes.ts` | `entities/rent/` |
| `api/feedBackApi.ts` | `hooks/queries/feedBackQueries.ts` | `types/admin/FeedBackTypes.ts` | `entities/feedback/` |
| `api/lockerApi.ts` | `hooks/queries/lockerQueries.ts` | `types/admin/lockersTypes.ts` | `entities/locker/` |
| `api/formApi.ts` | `hooks/queries/formQueries.ts` | `types/form/FormTypes.ts` | `features/rent-form/api/` |
| `types/contact/ContactTypes.ts` | — | — | `features/contact/model/types.ts` |

### 컴포넌트 매핑 (Atomic → FSD)

| Atomic 위치 | → FSD 위치 | 근거 |
|---|---|---|
| **atoms/BottomSheet/** | `shared/ui/BottomSheet/` | 범용 UI |
| **atoms/EmptyArea/** | `shared/ui/EmptyArea/` | 범용 UI |
| **atoms/DetailBtn/** | `shared/ui/DetailBtn/` | 범용 UI |
| **atoms/InformTitle/** | `shared/ui/InformTitle/` | 범용 UI |
| **atoms/NaverDirectionBtn/** | `shared/ui/NaverDirectionBtn/` | 범용 UI |
| **atoms/LocationClassificationBtn/** | `shared/ui/LocationClassificationBtn/` | 범용 UI |
| **atoms/MobileCardInfo/** | `shared/ui/MobileCardInfo/` | 범용 UI |
| **atoms/FeedBackDataTable/** | `entities/feedback/ui/` 또는 `features/admin-feedback/ui/` | 피드백 도메인 전용 |
| **atoms/Form/*** | `features/rent-form/ui/` | 대여 폼 도메인 |
| **atoms/SignUp/*** | `features/auth/ui/` | 인증 도메인 |
| **atoms/Login/*** | `features/auth/ui/` | 인증 도메인 |
| **atoms/Mypage/*** | `pages/mypage/ui/` | 마이페이지 전용 |
| **atoms/Header/*** | `widgets/header/ui/` | 헤더 위젯 |
| **atoms/Contact/*** | `features/contact/ui/` | 문의 도메인 |
| **atoms/RentalLocationTitle/** | `pages/rental-location/ui/` | 대여 위치 페이지 전용 |
| **molecules/ContentsTitle/** | `shared/ui/ContentsTitle/` | 범용 UI |
| **molecules/ErrorComponent/** | `shared/ui/ErrorComponent/` | 범용 UI |
| **molecules/ModalHeader/** | `shared/ui/ModalHeader/` | 범용 UI |
| **molecules/SelectBox/** | `shared/ui/SelectBox/` | 범용 UI |
| **molecules/MapBtn/** | `widgets/naver-map/ui/` | 지도 위젯 |
| **molecules/Footer/** | `widgets/footer/ui/` | 푸터 위젯 |
| **molecules/SignUp/** | `features/auth/ui/` | 인증 도메인 |
| **molecules/Mypage/** | `pages/mypage/ui/` | 마이페이지 전용 |
| **molecules/Store/** | `entities/store/ui/` | 지점 엔티티 표현 |
| **molecules/MobileCard/** | `entities/store/ui/` | 지점 카드 표현 |
| **molecules/MobileMenu/** | `widgets/header/ui/` | 모바일 메뉴 |
| **molecules/FormLocationMolecules/** | `features/rent-form/ui/` | 대여 폼 |
| **molecules/FormModal/** | `features/rent-form/ui/` | 대여 폼 모달 |
| **organisms/Header/** | `widgets/header/ui/` | 헤더 위젯 |
| **organisms/Footer/** | `widgets/footer/ui/` | 푸터 위젯 |
| **organisms/NaverMap/** | `widgets/naver-map/ui/` | 지도 위젯 |
| **organisms/ImgSwiper/** | `widgets/image-swiper/ui/` | 스와이퍼 위젯 |
| **organisms/PWAUpdatePrompt.tsx** | `widgets/pwa-prompt/ui/` | PWA 위젯 |
| **organisms/LoginForm/** | `features/auth/ui/` | 인증 도메인 |
| **organisms/Modal/** | `shared/ui/Modal/` | 범용 모달 |
| **organisms/BankModal/** | `shared/ui/BankModal/` 또는 `features/auth/ui/` | 은행 선택 (회원가입/마이페이지) |
| **organisms/Card/** | `entities/store/ui/` | 지점 카드 |
| **organisms/CardFooter/** | `entities/store/ui/` | 지점 카드 하단 |
| **organisms/Info/** | `widgets/` 또는 `pages/info/` | 정보 페이지 |
| **organisms/RentalInfoCard/** | `entities/store/ui/` | 대여 정보 카드 |
| **organisms/Mypage/** | `pages/mypage/ui/` | 마이페이지 |
| **organisms/admin/** | `features/admin-*/ui/` | 관리자 기능별 분산 |
| **templates/common/** | `app/layouts/` | MainLayout, BackgroundLayout |
| **templates/admin/** | `app/layouts/AdminWrapper.tsx` | 관리자 레이아웃 |
| **templates/Login/** | `app/layouts/BackgroundLayout.tsx` | 로그인 배경 레이아웃 |
| **templates/SignUp/** | `features/auth/ui/` 또는 `app/layouts/` | 회원가입 레이아웃 |

---

## 5. 도메인 식별 및 슬라이스 설계

### Entities (GET/SEARCH + Query Factory)

| 슬라이스 | 도메인 | 주요 타입 | 현재 소스 |
|---|---|---|---|
| `store` | 협업지점 (대여소) | `TStoreAllRes`, `TStoreListDetail` | `api/storeApi.ts` + `hooks/queries/storeQueries.ts` + `types/admin/StoreTypes.ts` + `types/stores/StoresTypes.ts` |
| `umbrella` | 우산 | `TUmbrella`, `TUmbrellaAdminRes` | `api/umbrellaApi.ts` + `hooks/queries/umbrellaQueries.ts` + `types/admin/umbrellaTypes.ts` |
| `user` | 사용자 | `TUserRes`, `TAdminUser` | `api/clientUserApi.ts` + `api/adminUserApi.ts` + `hooks/queries/userQueries.ts` + `types/admin/userTypes.ts` + `types/signup/SignupTypes.ts` + `types/mypage/MypageTypes.ts` |
| `rent` | 대여 이력 | `TRentHistoryRes`, `TRentFormRes` | `api/rentHistoryApi.ts` + `hooks/queries/rentQueries.ts` + `types/admin/RentTypes.ts` |
| `feedback` | 피드백/상태 신고 | `TFeedback` | `api/feedBackApi.ts` + `hooks/queries/feedBackQueries.ts` + `types/admin/FeedBackTypes.ts` |
| `locker` | 보관함 | `TLocker` | `api/lockerApi.ts` + `hooks/queries/lockerQueries.ts` + `types/admin/lockersTypes.ts` |

### Features (MUTATIONS — 2+ 페이지 재사용 시 feature, 아니면 page에 유지)

| 슬라이스 | 설명 | 현재 소스 |
|---|---|---|
| `auth` | 로그인/회원가입/OAuth + loginState/redirectUrl | `organisms/LoginForm/` + `atoms/Login/` + `atoms/SignUp/` + `molecules/SignUp/` + `templates/Login/` + `templates/SignUp/` + `recoil/` + `schemas/signUpSchema.ts` |
| `rent-form` | 대여 신청 폼 + formApi | `atoms/Form/*` + `molecules/FormLocationMolecules/` + `molecules/FormModal/` + `api/formApi.ts` + `hooks/queries/formQueries.ts` |
| `return-form` | 반납 폼/모달 | `pages/return/` 내 컴포넌트 |
| `contact` | 문의하기 (EmailJS) | `atoms/Contact/` + `pages/contact/` + `types/contact/ContactTypes.ts` |
| `admin-store` | 관리자 지점 CRUD | `organisms/admin/` + `pages/admin/store/` + `utils/admin/storeHelpers.tsx` |
| `admin-umbrella` | 관리자 우산 관리 | `pages/admin/umbrella/` |
| `admin-user` | 관리자 회원 관리 | `pages/admin/user/` |
| `admin-rent` | 관리자 대여/반납 현황 | `pages/admin/rent/` |
| `admin-feedback` | 관리자 피드백 확인 | `pages/admin/feedback/` |
| `admin-locker` | 관리자 보관함 관리 | `pages/admin/locker/` |

### Widgets (독립 UI 블록, 2+ 페이지에서 재사용)

| 슬라이스 | 현재 소스 |
|---|---|
| `header` | `atoms/Header/` + `organisms/Header/` + `molecules/MobileMenu/` |
| `footer` | `molecules/Footer/` + `organisms/Footer/` |
| `naver-map` | `organisms/NaverMap/` + `utils/map/*` + `styles/clusterMarker.css` + `styles/markerLabel.css` |
| `image-swiper` | `organisms/ImgSwiper/` |
| `pwa-prompt` | `organisms/PWAUpdatePrompt.tsx` |

---

## 6. 단계별 마이그레이션 전략

### 원칙

- **점진적 전환**: 한 번에 전체를 바꾸지 않고 레이어 단위로 진행
- **하위 레이어부터**: `shared` → `entities` → `features` → `widgets` → `pages` → `app`
- **기능 손상 없이**: 각 단계마다 `pnpm build` 확인
- **`@/*` alias 유지**: 기존 `@/*` → `src/*` 그대로 활용

### ⚠️ 최우선 처리 대상: `userQueries.ts`

`hooks/queries/userQueries.ts`는 Recoil + routes + axios + toast + navigate가 뒤섞여 있다. 반드시 분리:

- `entities/user/api/` — 순수 데이터 조회 (GET)
- `features/auth/model/` — auth 상태 (loginState, redirectUrl)
- `features/auth/api/` — 로그인/로그아웃/OAuth 뮤테이션

### 전체 타임라인

```
Phase 1: shared 레이어        ████░░░░░░  (1~2일)
Phase 2: entities 레이어      ██████░░░░  (2~3일)
Phase 3: features 레이어      ████████░░  (2~3일)
Phase 4: widgets 레이어       █████████░  (0.5~1일)
Phase 5: pages 리팩토링       ██████████  (1~2일)
Phase 6: app 레이어 정리      ██████████  (0.5~1일)
---
총 예상: 7~12일 (약 1.5~2.5주)
```

---

## 7. Phase 1: shared 레이어

가장 의존성이 없는 하위 레이어부터 시작한다.

### 1-1. `shared/api/` — axios 인스턴스

```
src/lib/axios.ts → src/shared/api/client.ts
```

```typescript
// src/shared/api/client.ts
import axios from "axios";
import qs from "qs";

export const $axios = axios.create({
  baseURL: import.meta.env.VITE_UPBRELLA_API_BASE_URL,
  timeout: 15000,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
  withCredentials: true,
});
```

```typescript
// src/shared/api/index.ts
export { $axios } from "./client";
```

### 1-2. `shared/model/` — 공통 타입

```
src/types/commonTypes.ts → src/shared/model/types.ts
src/types/null.d.ts      → src/shared/model/null.d.ts
```

### 1-3. `shared/config/` — 상수

```
src/constants/Date.ts      → src/shared/config/date.ts
src/constants/Account.ts   → src/shared/config/account.ts
src/constants/BankIcon.tsx  → src/shared/config/bank-icons.tsx
```

### 1-4. `shared/lib/` — 유틸리티

```
src/utils/error.ts          → src/shared/lib/error.ts
src/utils/locationUtils.ts  → src/shared/lib/location-utils.ts
src/utils/selectBox.ts      → src/shared/lib/select-box.ts
src/utils/utils.ts          → src/shared/lib/utils.ts
```

### 1-5. `shared/hooks/` — 범용 커스텀 훅

```
src/hooks/custom/usePaginator.ts    → src/shared/hooks/usePaginator.ts
src/hooks/custom/useModalStatus.tsx → src/shared/hooks/useModalStatus.tsx
```

### 1-6. `shared/ui/` — 범용 UI 컴포넌트

도메인에 종속되지 않는 컴포넌트를 이동:

```
atoms/BottomSheet/          → shared/ui/BottomSheet/
atoms/EmptyArea/            → shared/ui/EmptyArea/
atoms/DetailBtn/            → shared/ui/DetailBtn/
atoms/InformTitle/          → shared/ui/InformTitle/
atoms/NaverDirectionBtn/    → shared/ui/NaverDirectionBtn/
atoms/LocationClassificationBtn/ → shared/ui/LocationClassificationBtn/
atoms/MobileCardInfo/       → shared/ui/MobileCardInfo/
molecules/ContentsTitle/    → shared/ui/ContentsTitle/
molecules/ErrorComponent/   → shared/ui/ErrorComponent/
molecules/ModalHeader/      → shared/ui/ModalHeader/
molecules/SelectBox/        → shared/ui/SelectBox/
organisms/Modal/            → shared/ui/Modal/
utils/SeoMetaTag.tsx        → shared/ui/SeoMetaTag.tsx
```

### 1-7. `shared/assets/` — 이미지 리소스

```
src/assets/ → src/shared/assets/
```

### 1-8. barrel export 작성

```typescript
// src/shared/ui/index.ts
export { BottomSheet } from "./BottomSheet";
export { EmptyArea } from "./EmptyArea";
export { Modal } from "./Modal";
export { SeoMetaTag } from "./SeoMetaTag";
// ... 각 UI 컴포넌트
```

세그먼트별 import 권장:

```typescript
import { $axios } from "@/shared/api";
import { Modal } from "@/shared/ui";
import { getErrorMessage } from "@/shared/lib/error";
```

### 1-9. import 경로 일괄 치환

```
@/lib/axios          → @/shared/api
@/types/commonTypes  → @/shared/model/types
@/constants/Date     → @/shared/config/date
@/constants/Account  → @/shared/config/account
@/constants/BankIcon → @/shared/config/bank-icons
@/utils/error        → @/shared/lib/error
@/utils/locationUtils → @/shared/lib/location-utils
@/utils/selectBox    → @/shared/lib/select-box
@/utils/utils        → @/shared/lib/utils
@/hooks/custom/      → @/shared/hooks/
```

> `pnpm build`로 빌드 확인.

---

## 8. Phase 2: entities 레이어

각 비즈니스 엔티티의 **API(조회) + Query Factory + 타입**을 하나의 슬라이스로 통합한다.

FSD에서 Entity = GET/SEARCH + Query Factory. 뮤테이션(POST/PATCH/DELETE)은 features로.

### 슬라이스 구조 (공통 패턴)

```
entities/{name}/
├── api/
│   ├── {name}-api.ts          # $axios + TApiResponse<T> unwrap (조회 전용)
│   └── {name}.queries.ts      # Query Factory (React Query v4)
├── model/
│   └── types.ts               # 도메인 타입 (T-prefix)
├── ui/                        # 엔티티 표현 컴포넌트 (선택)
└── index.ts                   # Public API
```

### 예시: `entities/store/`

**api/store-api.ts** — 조회 API만 포함:

```typescript
import { $axios } from "@/shared/api";
import type { TApiResponse } from "@/shared/model/types";
import type { TStoreAllRes, TStoreListDetail } from "../model/types";

const API = {
  STORES: "/stores",
  STORE_DETAIL: (id: number) => `/stores/${id}`,
  CLASSIFICATIONS: "/stores/classifications",
  SUB_CLASSIFICATIONS: (id: number) => `/stores/classifications/${id}`,
  STORE_IMAGES: (id: number) => `/stores/${id}/images`,
  BUSINESS_HOURS: (id: number) => `/stores/${id}/business-hours`,
};

export const storeApi = {
  getAll: async (): Promise<TStoreAllRes> => {
    const { data } = await $axios.get<TApiResponse<TStoreAllRes>>(API.STORES);
    return data.data;
  },
  getById: async (id: number): Promise<TStoreListDetail> => {
    const { data } = await $axios.get<TApiResponse<TStoreListDetail>>(API.STORE_DETAIL(id));
    return data.data;
  },
  getClassifications: async () => {
    const { data } = await $axios.get(API.CLASSIFICATIONS);
    return data.data;
  },
  // ... 기타 조회 API
};
```

**api/store.queries.ts** — Query Factory:

```typescript
import { storeApi } from "./store-api";

export const storeQueries = {
  all: () => ["stores"] as const,
  lists: () => [...storeQueries.all(), "list"] as const,
  list: () => ({
    queryKey: storeQueries.lists(),
    queryFn: () => storeApi.getAll(),
  }),
  details: () => [...storeQueries.all(), "detail"] as const,
  detail: (id: number) => ({
    queryKey: [...storeQueries.details(), id],
    queryFn: () => storeApi.getById(id),
    staleTime: 5000,
  }),
};
```

**model/types.ts** — `types/admin/StoreTypes.ts` + `types/stores/StoresTypes.ts` 통합:

```typescript
export interface TStoreListDetail {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  umbrellaCount: number;
}

export interface TStoreAllRes {
  stores: TStoreListDetail[];
}

// ... 기존 StoreTypes + StoresTypes 타입 통합
```

**index.ts** — Public API:

```typescript
export { storeApi } from "./api/store-api";
export { storeQueries } from "./api/store.queries";
export type { TStoreAllRes, TStoreListDetail } from "./model/types";
```

### 각 엔티티별 매핑

| Entity | API 이동 | 타입 이동 | Query 이동 |
|---|---|---|---|
| `entities/store/` | `api/storeApi.ts` (조회 부분) | `types/admin/StoreTypes.ts` + `types/stores/StoresTypes.ts` | `hooks/queries/storeQueries.ts` |
| `entities/umbrella/` | `api/umbrellaApi.ts` (조회 부분) | `types/admin/umbrellaTypes.ts` | `hooks/queries/umbrellaQueries.ts` |
| `entities/user/` | `api/clientUserApi.ts` + `api/adminUserApi.ts` (조회 부분) | `types/admin/userTypes.ts` + `types/signup/SignupTypes.ts` + `types/mypage/MypageTypes.ts` | `hooks/queries/userQueries.ts` (조회 부분만) |
| `entities/rent/` | `api/rentHistoryApi.ts` (조회 부분) | `types/admin/RentTypes.ts` | `hooks/queries/rentQueries.ts` |
| `entities/feedback/` | `api/feedBackApi.ts` | `types/admin/FeedBackTypes.ts` | `hooks/queries/feedBackQueries.ts` |
| `entities/locker/` | `api/lockerApi.ts` (조회 부분) | `types/admin/lockersTypes.ts` | `hooks/queries/lockerQueries.ts` |

### import 경로 치환

```
@/api/storeApi                  → @/entities/store
@/hooks/queries/storeQueries    → @/entities/store
@/types/admin/StoreTypes        → @/entities/store
@/types/stores/StoresTypes      → @/entities/store
```

(다른 엔티티도 동일 패턴)

> `pnpm build`로 빌드 확인.

---

## 9. Phase 3: features 레이어

**뮤테이션(POST/PATCH/DELETE) + 사용자 인터랙션 단위**로 UI + 로직을 묶는다. 2+ 페이지에서 재사용되는 액션만 feature로 추출. 한 페이지에서만 쓰이면 page에 유지.

### 뮤테이션 훅 패턴

```typescript
// features/admin-store/api/use-create-store.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { storeApi, storeQueries } from "@/entities/store";
import toast from "react-hot-toast";

export const useCreateStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: storeApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries(storeQueries.lists());
      toast.success("등록되었습니다.");
    },
    onError: () => {
      toast.error("등록에 실패했습니다.");
    },
  });
};
```

### `features/auth/` — 인증 (로그인/회원가입/OAuth)

```
src/features/auth/
├── ui/
│   ├── LoginForm.tsx         ← organisms/LoginForm/
│   ├── SignUpInputs.tsx      ← atoms/SignUp/ + molecules/SignUp/
│   └── OAuthButtons.tsx      ← atoms/Login/
├── model/
│   ├── auth-store.ts         ← recoil/index.ts (loginState, loginInfo, redirectUrl)
│   └── signup-schema.ts      ← schemas/signUpSchema.ts
├── api/
│   └── auth-api.ts           ← userQueries.ts에서 로그인/로그아웃/OAuth 분리
└── index.ts
```

Recoil atoms는 `features/auth/model/auth-store.ts`에 위치:

```typescript
// features/auth/model/auth-store.ts
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const loginState = atom({
  key: "loginState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const redirectUrl = atom({
  key: "redirectUrl",
  default: "/",
  effects_UNSTABLE: [persistAtom],
});
```

### `features/rent-form/` — 대여 폼

```
src/features/rent-form/
├── ui/
│   ├── FormBasic.tsx          ← atoms/Form/FormBasic/
│   ├── FormLocation.tsx       ← atoms/Form/FormLocation/
│   ├── FormButton.tsx         ← atoms/Form/FormButton/
│   ├── FormStatus.tsx         ← atoms/Form/FormStatus/
│   ├── RentDepositModal.tsx   ← molecules/FormModal/
│   ├── RentAccountModal.tsx
│   └── RentFinishModal.tsx
├── model/
│   └── types.ts               ← types/form/FormTypes.ts
├── api/
│   ├── form-api.ts            ← api/formApi.ts
│   └── use-submit-rent.ts     # postRent 뮤테이션 훅
└── index.ts
```

### `features/return-form/` — 반납 폼

```
src/features/return-form/
├── ui/
│   └── ReturnModal.tsx
├── api/
│   └── use-submit-return.ts   # patchReturn 뮤테이션 훅
└── index.ts
```

### `features/contact/` — 문의하기

```
src/features/contact/
├── ui/
│   └── ContactForm.tsx         ← atoms/Contact/ + pages/contact/
├── model/
│   └── types.ts                ← types/contact/ContactTypes.ts
└── index.ts
```

### Admin features (도메인별 분리)

각 admin 기능은 별도 슬라이스로:

```
features/admin-store/
├── ui/
│   ├── StoreTable.tsx           ← organisms/admin/StoreTable
│   ├── StoreFormWrapper.tsx     ← pages/admin/store/UI/
│   └── StoreModals.tsx
├── model/
│   └── storeHelpers.ts          ← utils/admin/storeHelpers.tsx
├── api/
│   ├── use-create-store.ts
│   ├── use-update-store.ts
│   └── use-delete-store.ts
└── index.ts
```

```
features/admin-umbrella/
├── ui/
│   ├── UmbrellaModal.tsx        ← pages/admin/umbrella/UI/
│   └── UmbrellaExcelButton.tsx
├── api/
│   ├── use-create-umbrella.ts
│   ├── use-update-umbrella.ts
│   └── use-delete-umbrella.ts
└── index.ts
```

(admin-user, admin-rent, admin-feedback, admin-locker도 동일 패턴)

> `pnpm build`로 빌드 확인.

---

## 10. Phase 4: widgets 레이어

**페이지 독립적이고 자체 완결적인 UI 블록**을 widget으로 추출한다. 2+ 페이지에서 재사용되거나 페이지에 여러 대형 블록이 있을 때 위젯으로 분리.

### `widgets/header/`

```
src/widgets/header/
├── ui/
│   ├── HeaderContainer.tsx     ← organisms/Header/HeaderContainer.tsx
│   └── MobileMenu.tsx          ← molecules/MobileMenu/
└── index.ts
```

소스: `atoms/Header/*` + `organisms/Header/*` + `molecules/MobileMenu/*`

### `widgets/footer/`

```
src/widgets/footer/
├── ui/
│   └── Footer.tsx              ← organisms/Footer/ + molecules/Footer/
└── index.ts
```

### `widgets/naver-map/`

```
src/widgets/naver-map/
├── ui/
│   └── NaverMap.tsx            ← organisms/NaverMap/
├── lib/
│   ├── clusterMarkerUtils.ts  ← utils/map/clusterMarkerUtils.ts
│   ├── mapHelper.ts           ← utils/map/mapHelper.ts
│   └── markerCluster.ts       ← utils/map/markerCluster.ts
├── styles/
│   ├── clusterMarker.css      ← styles/clusterMarker.css
│   └── markerLabel.css        ← styles/markerLabel.css
└── index.ts
```

### `widgets/image-swiper/`

```
src/widgets/image-swiper/
├── ui/
│   └── ImgSwiper.tsx           ← organisms/ImgSwiper/
└── index.ts
```

### `widgets/pwa-prompt/`

```
src/widgets/pwa-prompt/
├── ui/
│   └── PWAUpdatePrompt.tsx     ← organisms/PWAUpdatePrompt.tsx
└── index.ts
```

> `pnpm build`로 빌드 확인.

---

## 11. Phase 5: pages 레이어

pages는 **조합(composition)만 담당**. 비즈니스 로직/UI는 하위 레이어에서 import.

한 페이지에서만 사용되는 컴포넌트는 해당 `pages/{name}/ui/` 에 둔다.

### 예시: 대여 위치 페이지

```typescript
// src/pages/rental-location/ui/RentalLocationPage.tsx
import { NaverMap } from "@/widgets/naver-map";
import { useQuery } from "@tanstack/react-query";
import { storeQueries, StoreCard } from "@/entities/store";
import { SeoMetaTag } from "@/shared/ui";
import { ClassificationsButtons } from "./ClassificationsButtons";

export const RentalLocationPage = () => {
  const { data } = useQuery(storeQueries.list());
  // widgets, entities를 조합하여 페이지 구성
};
```

### 기존 pages 매핑

```
components/pages/RentalLocation/         → pages/rental-location/ui/
 └── ClassificationsButtons.tsx           → pages/rental-location/ui/ClassificationsButtons.tsx
components/pages/rentalOffice/           → pages/rental-office/ui/
components/pages/officeDetail/           → pages/rental-office/ui/OfficeDetailPage.tsx
components/pages/Login/LoginPage/        → pages/auth/ui/LoginPage.tsx
components/pages/Login/LoginRedirectPage/ → pages/auth/ui/LoginRedirectPage.tsx
components/pages/Login/AppleLoginRedirectPage/ → pages/auth/ui/AppleLoginRedirectPage.tsx
components/pages/SignUp/                 → pages/auth/ui/SignUpPage.tsx
components/pages/Mypage/                 → pages/mypage/ui/
 ├── MypageLayout.tsx
 ├── MypageRentPage/
 ├── MypageAccountPage/
 ├── MypageInfoPage/
 └── MypageContactPage/
components/pages/rent/                   → pages/rent/ui/
components/pages/return/                 → pages/return/ui/
components/pages/contact/                → pages/contact/ui/
components/pages/story/                  → pages/story/ui/
components/pages/Info/                   → pages/info/ui/
components/pages/tos/                    → pages/tos/ui/
components/pages/pp/                     → pages/pp/ui/
components/pages/forbidden/              → pages/forbidden/ui/
components/pages/not-found/              → pages/not-found/ui/
components/pages/admin/store/            → pages/admin/store/ui/
 └── StoreManagePage.tsx (조합만, StoreTable 등은 features/admin-store에서 import)
components/pages/admin/umbrella/         → pages/admin/umbrella/ui/
components/pages/admin/user/             → pages/admin/user/ui/
components/pages/admin/rent/             → pages/admin/rent/ui/
components/pages/admin/feedback/         → pages/admin/feedback/ui/
components/pages/admin/locker/           → pages/admin/locker/ui/
components/pages/admin/components/       → pages/admin/ (공통 Table 컴포넌트)
```

제거 대상: `components/pages/offline/OfflinePage.tsx`, `components/pages/temp/TempPage.tsx`

> `pnpm build`로 빌드 확인.

---

## 12. Phase 6: app 레이어

### 12-1. Providers 분리

```typescript
// src/app/providers/QueryProvider.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      refetchOnMount: "always",
      retryOnMount: false,
    },
  },
});

export const QueryProvider = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
```

### 12-2. Router 통합

5개의 분산된 라우트 파일을 하나로 통합:

```
src/routes/adminRouter.ts
src/routes/backgroundImageRouter.ts
src/routes/basicRouter.ts
src/routes/layoutRouter.ts
src/routes/notLayoutRouter.ts
→ src/app/router/routes.tsx (통합)
```

```typescript
// src/app/router/routes.tsx
import { Route, Routes } from "react-router-dom";
import { MainLayout, BackgroundLayout, AdminWrapper } from "@/app/layouts";
import { PrivateRoute, AdminRoute } from "@/app/router/guards";
// pages에서 lazy import
```

### 12-3. Guards 이동

```
src/utils/PrivateRoutes.tsx → src/app/router/guards/PrivateRoute.tsx
src/utils/AdminRoutes.tsx   → src/app/router/guards/AdminRoute.tsx
```

### 12-4. Layouts 이동

```
templates/common/MainLayout        → app/layouts/MainLayout.tsx
templates/common/BackgroundLayout  → app/layouts/BackgroundLayout.tsx
templates/admin/AdminWrapper       → app/layouts/AdminWrapper.tsx
```

### 12-5. Styles 이동

```
src/index.css       → app/styles/index.css
src/styles/fonts/   → app/styles/fonts/
```

### 12-6. 최종 main.tsx

```typescript
// src/app/main.tsx
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, createTheme } from "@mui/material";
import { queryClient } from "@/shared/api/query-client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={createTheme({})}>
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </BrowserRouter>
);
```

### 12-7. 기존 디렉토리 삭제

모든 파일이 이동된 후:

```bash
rm -rf src/components/atoms
rm -rf src/components/molecules
rm -rf src/components/organisms
rm -rf src/components/templates
rm -rf src/components/pages
rm -rf src/components
rm -rf src/api
rm -rf src/hooks
rm -rf src/lib
rm -rf src/recoil
rm -rf src/routes
rm -rf src/schemas
rm -rf src/types
rm -rf src/utils
rm -rf src/constants
rm -rf src/stories
```

> 최종 빌드 + 전체 동작 확인.

---

## 13. Import 규칙 및 Lint 설정

### FSD Import 규칙

| From | Can Import |
|------|-----------|
| app/ | pages, widgets, features, entities, shared |
| pages/ | widgets, features, entities, shared |
| widgets/ | features, entities, shared |
| features/ | entities, shared |
| entities/ | shared |
| shared/ | (nothing) |

**절대 금지:**

```
entities → features       (엔티티가 기능을 참조)
shared → entities         (공유가 엔티티를 참조)
features → widgets        (기능이 위젯을 참조)
같은 레이어 내 슬라이스 간 직접 참조
```

### Cross-Slice 패턴

엔티티 간 참조가 필요할 때 `@x` notation 사용 (최소화):

```
entities/store/@x/umbrella.ts    # umbrella 엔티티 전용 API
```

```typescript
// entities/store/@x/umbrella.ts
export { storeApi } from "../api/store-api";
export type { TStoreListDetail } from "../model/types";

// entities/umbrella/model/types.ts
import type { TStoreListDetail } from "@/entities/store/@x/umbrella";
```

엔티티 UI에서 다른 레이어 컴포넌트가 필요하면 **Slots 패턴** 사용:

```typescript
// entities/store/ui/StoreCard.tsx
interface StoreCardProps {
  store: TStoreListDetail;
  actionsSlot?: React.ReactNode;
}

export function StoreCard({ store, actionsSlot }: StoreCardProps) {
  return (
    <div>
      <h3>{store.name}</h3>
      <p>{store.address}</p>
      {actionsSlot}
    </div>
  );
}
```

### eslint-plugin-boundaries 설정 (권장)

```bash
pnpm add -D eslint-plugin-boundaries
```

```json
// .eslintrc에 추가
{
  "plugins": ["boundaries"],
  "settings": {
    "boundaries/elements": [
      { "type": "app", "pattern": "src/app/*" },
      { "type": "pages", "pattern": "src/pages/*" },
      { "type": "widgets", "pattern": "src/widgets/*" },
      { "type": "features", "pattern": "src/features/*" },
      { "type": "entities", "pattern": "src/entities/*" },
      { "type": "shared", "pattern": "src/shared/*" }
    ],
    "boundaries/dependency-nodes": ["import"]
  },
  "rules": {
    "boundaries/element-types": [2, {
      "default": "disallow",
      "rules": [
        { "from": "app", "allow": ["pages", "widgets", "features", "entities", "shared"] },
        { "from": "pages", "allow": ["widgets", "features", "entities", "shared"] },
        { "from": "widgets", "allow": ["features", "entities", "shared"] },
        { "from": "features", "allow": ["entities", "shared"] },
        { "from": "entities", "allow": ["shared"] }
      ]
    }]
  }
}
```

### tsconfig paths

기존 `@/*` → `src/*` alias를 유지하면 추가 설정 불필요:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

사용 예:

```typescript
import { $axios } from "@/shared/api";
import { storeQueries } from "@/entities/store";
import { LoginForm } from "@/features/auth";
import { Header } from "@/widgets/header";
import { RentalLocationPage } from "@/pages/rental-location";
```

---

## 14. 체크리스트

### Phase 1: shared

- [ ] `shared/api/client.ts` — $axios 인스턴스 이동 (`lib/axios.ts`)
- [ ] `shared/api/index.ts` — barrel export
- [ ] `shared/model/types.ts` — 공통 타입 이동 (`types/commonTypes.ts`)
- [ ] `shared/model/null.d.ts` — null 타입 선언 이동
- [ ] `shared/config/date.ts` — DAY_OF_WEEK (`constants/Date.ts`)
- [ ] `shared/config/account.ts` — 계좌 상수 (`constants/Account.ts`)
- [ ] `shared/config/bank-icons.tsx` — 은행 아이콘 (`constants/BankIcon.tsx`)
- [ ] `shared/lib/error.ts` — getErrorMessage (`utils/error.ts`)
- [ ] `shared/lib/location-utils.ts` — 위치 유틸 (`utils/locationUtils.ts`)
- [ ] `shared/lib/select-box.ts` — SelectBox 유틸 (`utils/selectBox.ts`)
- [ ] `shared/lib/utils.ts` — 포맷/검증 유틸 (`utils/utils.ts`)
- [ ] `shared/hooks/usePaginator.ts` — 페이지네이션 훅
- [ ] `shared/hooks/useModalStatus.tsx` — 모달 상태 훅
- [ ] `shared/ui/` — 범용 UI 컴포넌트 13종 이동
- [ ] `shared/ui/index.ts` — barrel export
- [ ] `shared/assets/` — 이미지 리소스 이동
- [ ] import 경로 일괄 치환
- [ ] `pnpm build` 확인

### Phase 2: entities

- [ ] `entities/store/` — api(조회) + queries + types 통합 (StoreTypes + StoresTypes 병합)
- [ ] `entities/umbrella/` — api(조회) + queries + types 통합
- [ ] `entities/user/` — api(조회) + queries + types 통합 (userTypes + SignupTypes + MypageTypes 병합)
- [ ] `entities/rent/` — api(조회) + queries + types 통합
- [ ] `entities/feedback/` — api(조회) + queries + types 통합
- [ ] `entities/locker/` — api(조회) + queries + types 통합
- [ ] 각 엔티티 `index.ts` — public API export
- [ ] import 경로 치환
- [ ] `pnpm build` 확인

### Phase 3: features

- [ ] `features/auth/` — LoginForm + SignUp UI + Recoil(loginState, redirectUrl) + signUpSchema + OAuth API
- [ ] `features/rent-form/` — Form UI + formApi + postRent 뮤테이션 + FormTypes
- [ ] `features/return-form/` — ReturnModal + patchReturn 뮤테이션
- [ ] `features/contact/` — ContactForm + ContactTypes
- [ ] `features/admin-store/` — StoreTable + storeHelpers + CRUD 뮤테이션
- [ ] `features/admin-umbrella/` — UmbrellaModal + ExcelButton + CRUD 뮤테이션
- [ ] `features/admin-user/` — deleteUsers, patchAdminUsers 뮤테이션
- [ ] `features/admin-rent/` — payment/refund 뮤테이션 + helpers
- [ ] `features/admin-feedback/` — 피드백 관리 기능
- [ ] `features/admin-locker/` — LockerModal + CRUD 뮤테이션
- [ ] 각 feature `index.ts` — public API export
- [ ] import 경로 치환
- [ ] `pnpm build` 확인

### Phase 4: widgets

- [ ] `widgets/header/` — HeaderContainer + MobileMenu + Header atoms
- [ ] `widgets/footer/` — Footer (organisms + molecules 병합)
- [ ] `widgets/naver-map/` — NaverMap + map 유틸 3종 + map CSS 2종
- [ ] `widgets/image-swiper/` — ImgSwiper
- [ ] `widgets/pwa-prompt/` — PWAUpdatePrompt
- [ ] 각 widget `index.ts` — public API export
- [ ] import 경로 치환
- [ ] `pnpm build` 확인

### Phase 5: pages

- [ ] `pages/rental-location/` — RentalLocationPage + ClassificationsButtons
- [ ] `pages/rental-office/` — RentalOfficePage + OfficeDetailPage
- [ ] `pages/auth/` — LoginPage, LoginRedirectPage, AppleLoginRedirectPage, SignUpPage
- [ ] `pages/mypage/` — MypageLayout + Rent/Account/Info/Contact 페이지
- [ ] `pages/rent/` — RentFormPage
- [ ] `pages/return/` — ReturnFormPage
- [ ] `pages/contact/` — ContactPage
- [ ] `pages/story/` — UpbrellaStoryPage + data.ts + StorySection UI
- [ ] `pages/info/` — InfoPage
- [ ] `pages/tos/` — TosPage
- [ ] `pages/pp/` — PrivacyPolicyPage
- [ ] `pages/forbidden/` — ForbiddenPage
- [ ] `pages/not-found/` — NotFoundPage
- [ ] `pages/admin/store/` — StoreManagePage (조합만)
- [ ] `pages/admin/umbrella/` — UmbrellaAdminPage (조합만)
- [ ] `pages/admin/user/` — UserAdminPage (조합만)
- [ ] `pages/admin/rent/` — RentHistoryPage (조합만)
- [ ] `pages/admin/feedback/` — UmbrellaFeedBackPage (조합만)
- [ ] `pages/admin/locker/` — LockerAdminPage (조합만)
- [ ] 페이지 내 비즈니스 로직을 features/entities로 추출 확인
- [ ] import 경로 치환
- [ ] `pnpm build` 확인

### Phase 6: app

- [ ] `app/providers/QueryProvider.tsx` — QueryClient + Provider
- [ ] `app/providers/ThemeProvider.tsx` — MUI Theme Provider
- [ ] `app/router/routes.tsx` — 5개 라우트 통합
- [ ] `app/router/guards/PrivateRoute.tsx` — 인증 가드
- [ ] `app/router/guards/AdminRoute.tsx` — 관리자 가드
- [ ] `app/layouts/MainLayout.tsx` — 메인 레이아웃
- [ ] `app/layouts/BackgroundLayout.tsx` — 배경 레이아웃
- [ ] `app/layouts/AdminWrapper.tsx` — 관리자 레이아웃
- [ ] `app/styles/index.css` — 글로벌 CSS
- [ ] `app/styles/fonts/` — 폰트 파일
- [ ] `app/main.tsx` — 진입점 정리
- [ ] `app/App.tsx` — 앱 루트
- [ ] 기존 빈 디렉토리 삭제 (components, api, hooks, lib, recoil, routes, schemas, types, utils, constants, stories)
- [ ] `eslint-plugin-boundaries` 설정
- [ ] `pnpm build` — **최종 빌드 확인**
- [ ] 전체 동작 확인 (로그인, 대여, 반납, 관리자)

### 마이그레이션 완료 후

- [ ] Storybook import 경로 업데이트
- [ ] CI/CD 빌드 파이프라인 확인
- [ ] Vite 설정 확인 (vite-plugin-pwa 캐싱 경로 등)
- [ ] README.md 업데이트
- [ ] 팀원 코드 리뷰
