# Upbrella: Migration Mapping

Current Atomic Design → FSD mapping. Full details in `docs/FSD_MIGRATION_GUIDE.md`.

---

## Upbrella Slices Inventory

### Entities (Business Data)

| Entity | Domain | Key Types | Current Source |
|--------|--------|-----------|---------------|
| `store` | 협업지점 | `TStoreAllRes`, `TStoreListDetail` | `api/storeApi.ts` + `hooks/queries/storeQueries.ts` |
| `umbrella` | 우산 | `TUmbrella`, `TUmbrellaAdminRes` | `api/umbrellaApi.ts` + `hooks/queries/umbrellaQueries.ts` |
| `user` | 사용자 | `TUserRes`, `TAdminUser` | `api/clientUserApi.ts` + `api/adminUserApi.ts` + `hooks/queries/userQueries.ts` |
| `rent` | 대여이력 | `TRentHistoryRes`, `TRentFormRes` | `api/rentHistoryApi.ts` + `hooks/queries/rentQueries.ts` |
| `feedback` | 피드백 | `TFeedback` | `api/feedBackApi.ts` + `hooks/queries/feedBackQueries.ts` |
| `locker` | 보관함 | `TLocker` | `api/lockerApi.ts` + `hooks/queries/lockerQueries.ts` |

### Features (User Actions)

| Feature | Purpose | Current Source |
|---------|---------|---------------|
| `auth` | Login, signup, OAuth, loginState/redirectUrl | `organisms/LoginForm/` + `templates/SignUp/` + `recoil/` |
| `rent-form` | Rental form submission | `atoms/Form/` + `molecules/Form/` + `api/formApi.ts` |
| `return-form` | Return form/modal | `pages/` components |
| `contact` | Contact email (EmailJS) | `pages/contact/` |
| `admin-store` | Admin store CRUD | `organisms/admin/StoreTable` + `pages/admin/store/` |
| `admin-umbrella` | Admin umbrella mgmt | `pages/admin/umbrella/` |
| `admin-user` | Admin user mgmt | `pages/admin/user/` |
| `admin-rent` | Admin rental mgmt | `pages/admin/rent/` |
| `admin-feedback` | Admin feedback mgmt | `pages/admin/feedback/` |
| `admin-locker` | Admin locker mgmt | `pages/admin/locker/` |

### Widgets

| Widget | Current Source |
|--------|---------------|
| `header` | `organisms/Info/Header/HeaderContainer` |
| `footer` | `organisms/Info/Footer/` |
| `naver-map` | `organisms/Map/` + `utils/map/` |
| `image-swiper` | `organisms/ImgSwiper/` |
| `pwa-prompt` | `organisms/PWAUpdatePrompt` |

---

## Directory Mapping

| Current | → FSD |
|---------|-------|
| `main.tsx`, `App.tsx` | `app/` |
| `lib/axios.ts` | `shared/api/client.ts` |
| `constants/` | `shared/config/` |
| `utils/error.ts, utils.ts` | `shared/lib/` |
| `utils/PrivateRoutes.tsx` | `app/router/guards/PrivateRoute.tsx` |
| `utils/AdminRoutes.tsx` | `app/router/guards/AdminRoute.tsx` |
| `utils/SeoMetaTag.tsx` | `shared/ui/SeoMetaTag.tsx` |
| `recoil/` | `features/auth/model/` |
| `routes/` (5 files) | `app/router/routes.tsx` |
| `schemas/` | `features/*/model/` |
| `types/commonTypes.ts` | `shared/model/types.ts` |
| `hooks/custom/` | `shared/hooks/` |
| `styles/fonts/` | `app/styles/fonts/` |
| `templates/common/MainLayout/` | `app/layouts/MainLayout.tsx` |
| `templates/Login/` | `app/layouts/BackgroundLayout.tsx` |
| `organisms/admin/AdminWrapper/` | `app/layouts/AdminWrapper.tsx` |

### Generic UI → shared/ui/

`atoms/BottomSheet/`, `atoms/InformTitle/`, `atoms/MobileCardInfo/`, `atoms/NaverDirectionBtn/`, `atoms/LocationClassificationBtn/`, `molecules/ErrorComponent/`, `molecules/ContentsTitle/`, `molecules/SelectBox/`, `organisms/Modal/`

---

## Priority & Phased Approach

**⚠️ #1 Priority: `userQueries.ts`** — Mixes Recoil + routes + axios + toast + navigate. Split into:
- `entities/user/api/` — pure data fetching
- `features/auth/model/` — auth state
- `features/auth/api/` — login/logout/OAuth

### Phases

1. **shared** — `lib/axios.ts`, `constants/`, `types/commonTypes.ts`, generic UI atoms
2. **entities** — Colocate api + queries + types per domain
3. **features** — Extract mutations, auth, form logic
4. **widgets** — Header, Map, Swiper, PWA
5. **pages** — Refactor to compose from lower layers
6. **app** — Consolidate router, guards, providers, layouts

See `docs/FSD_MIGRATION_GUIDE.md` for full per-phase checklists.
