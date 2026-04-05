---
name: fsd-fe
description: Build and migrate Upbrella frontend using Feature Sliced Design (FSD). Organizes code into layers (app, pages, widgets, features, entities, shared) with Vite + React 18 + React Query v4 + Recoil + MUI/Tailwind. Use when creating new components, pages, features, entities, or widgets; adding API calls, queries, or mutations; migrating from Atomic Design to FSD; organizing code by business domain (store, umbrella, user, rent, feedback, locker); setting up routing, layouts, or guards; refactoring imports for FSD compliance; deciding which FSD layer code belongs in.
---

# Upbrella FSD Frontend

Vite + React 18 + Feature Sliced Design. Migrating from Atomic Design.

## Core Principles

- **Entities** = GET/SEARCH + Query Factory | **Features** = MUTATIONS (reused on 2+ pages)
- **Import**: Only from layers below, only via `index.ts`
- **Types**: Domain types in `entities/{name}/model/types.ts`
- **Migration**: Follow `docs/FSD_MIGRATION_GUIDE.md`

## Project Structure

```
src/
├── app/           # Entry, providers, router, layouts, guards, styles
├── pages/         # Route-level composition (combine lower layers)
├── widgets/       # Large reusable UI blocks (header, naver-map, swiper)
├── features/      # User actions/mutations (auth, rent-form, admin-*)
├── entities/      # Business data (store, umbrella, user, rent, feedback, locker)
└── shared/        # No business logic (api, ui, lib, model, hooks, config)
```

## Layer Import Rules

| From | Can Import |
|------|-----------|
| app/ | pages, widgets, features, entities, shared |
| pages/ | widgets, features, entities, shared |
| widgets/ | features, entities, shared |
| features/ | entities, shared |
| entities/ | shared |
| shared/ | (nothing) |

Never import from same layer. Only via `index.ts`. Type imports OK across boundaries.
For cross-slice patterns (@x, slots, eslint config) → Read [import-rules.md](./reference/import-rules.md)

## Decision Guide

| Scenario | Layer |
|----------|-------|
| `$axios`, `TApiResponse`, QueryClient | `shared/api/` |
| Reusable Button, Input, Modal, BottomSheet | `shared/ui/` |
| Store, User, Umbrella data + queries | `entities/{name}/` |
| Create/Update/Delete mutation | `features/{action}/` |
| Auth login/signup/OAuth + loginState | `features/auth/` |
| Action on ONE page only | `pages/{page}/` |
| Header, NaverMap, Swiper, PWA prompt | `widgets/{name}/` |
| Route config, guards, layouts | `app/` |

**Create a feature?** YES if reused on 2+ pages. NO → keep in page slice.
**Create a widget?** YES if reused on 2+ pages OR page has multiple large blocks.

## Quick Checklists

**New Entity:**
- [ ] `api/{entity}-api.ts` with `$axios` + `TApiResponse<T>` unwrap
- [ ] `api/{entity}.queries.ts` query factory (React Query v4)
- [ ] `model/types.ts` domain types (T-prefix convention)
- [ ] `ui/` entity display components
- [ ] `index.ts` public API

**New Feature:**
- [ ] `api/use-{action}-{entity}.ts` mutation hook
- [ ] Invalidate queries on success + `react-hot-toast` feedback
- [ ] `model/schema.ts` Zod validation (if form)
- [ ] `ui/` feature UI components
- [ ] `index.ts` public API

**Migration:**
- [ ] Check `docs/FSD_MIGRATION_GUIDE.md` and [migration-mapping.md](./reference/migration-mapping.md)
- [ ] Colocate api + queries + types into entity/feature slices
- [ ] Create `index.ts` for each new slice

## Tech Stack

| Area | Tech |
|------|------|
| Build | Vite 4, `@vitejs/plugin-react-swc`, `vite-tsconfig-paths` |
| Styling | Tailwind 3 + MUI 5 + Emotion (hybrid) |
| Data | React Query v4, Axios (`$axios`), `TApiResponse<T>` |
| Forms | react-hook-form + Zod |
| State | Recoil + recoil-persist |
| Admin UI | PrimeReact tables/paginator |
| Maps | Naver Maps, Kakao, Supercluster |
| Env | `VITE_UPBRELLA_API_BASE_URL` (prod), `/api` proxy (dev) |

## Reference (On-Demand)

**Need code examples?** → Read [code-patterns.md](./reference/code-patterns.md)
Entity API, Query Factory, Mutation hooks, Recoil atoms, index.ts exports, naming conventions.

**Need import rules detail?** → Read [import-rules.md](./reference/import-rules.md)
@x notation, slots pattern, props passing, eslint-plugin-boundaries config.

**Need migration mapping?** → Read [migration-mapping.md](./reference/migration-mapping.md)
Current→FSD directory/file mapping, Upbrella slice inventory, phased approach.
