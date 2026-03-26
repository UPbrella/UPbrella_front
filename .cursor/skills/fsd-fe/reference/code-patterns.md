# FSD Code Patterns — Upbrella

All code examples in one place. SKILL.md references this file on-demand.

---

## Entity Slice Structure

```
entities/{name}/
├── api/
│   ├── {name}-api.ts       # CRUD with $axios + TApiResponse<T>
│   └── {name}.queries.ts   # Query factory (React Query v4)
├── model/
│   ├── types.ts            # Domain types (T-prefix)
│   └── store.ts            # Recoil atoms (optional)
├── ui/                     # Display components
└── index.ts                # Public API
```

### Entity API (`entities/store/api/store-api.ts`)

```tsx
import { $axios } from "@/shared/api";
import type { TApiResponse } from "@/shared/model/types";
import type { TStoreAllRes, TStoreListDetail } from "../model/types";

const API = {
  STORES: "/stores",
  STORE_DETAIL: (id: number) => `/stores/${id}`,
  ADMIN_STORES: "/admin/stores",
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
  create: (body: CreateStoreInput) => $axios.post(API.ADMIN_STORES, body),
  update: (id: number, body: UpdateStoreInput) => $axios.patch(`${API.ADMIN_STORES}/${id}`, body),
  delete: (id: number) => $axios.delete(`${API.ADMIN_STORES}/${id}`),
};
```

### Query Factory (`entities/store/api/store.queries.ts`)

```tsx
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

// Usage:
// const { data } = useQuery(storeQueries.list());
// const { data } = useQuery(storeQueries.detail(id));
```

### Domain Types (`entities/store/model/types.ts`)

```tsx
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
```

### Public API (`entities/store/index.ts`)

```tsx
export { storeApi } from "./api/store-api";
export { storeQueries } from "./api/store.queries";
export { StoreCard } from "./ui/store-card";
export { selectedStoreIdState } from "./model/store";
export type { TStoreAllRes, TStoreListDetail } from "./model/types";
```

---

## Feature Slice Structure

```
features/{action}/
├── api/
│   └── use-{action}-{entity}.ts   # Mutation hook
├── model/
│   └── schema.ts                  # Zod validation (if form)
├── ui/                            # Feature UI
└── index.ts
```

### Mutation Hook (`features/admin-store/api/use-create-store.ts`)

```tsx
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

### Zod Schema (`features/auth/model/signup-schema.ts`)

```tsx
import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요"),
  phone: z.string().regex(/^01[0-9]-\d{4}-\d{4}$/),
  bank: z.string().min(1),
  accountNumber: z.string().min(1),
});
```

---

## Recoil Patterns

### Entity-level atom

```tsx
// entities/store/model/store.ts
import { atom } from "recoil";

export const selectedStoreIdState = atom<number | null>({
  key: "store/selectedStoreId",
  default: null,
});
```

### Auth atoms (cross-cutting, persisted)

```tsx
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

---

## App Layer Patterns

### Entry Point (`app/main.tsx`)

```tsx
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

### Shared API Client (`shared/api/client.ts`)

```tsx
import axios from "axios";
import qs from "qs";

export const $axios = axios.create({
  baseURL: import.meta.env.VITE_UPBRELLA_API_BASE_URL,
  timeout: 15000,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
  withCredentials: true,
});
```

---

## UI Patterns

### Slots (cross-slice composition)

```tsx
// entities/store/ui/store-card.tsx
interface StoreCardProps {
  store: TStoreListDetail;
  actionsSlot?: React.ReactNode;
}

export function StoreCard({ store, actionsSlot }: StoreCardProps) {
  return (
    <div className="flex flex-col gap-8 p-16 rounded-12 border border-gray-200">
      <h3 className="text-16 font-semibold">{store.name}</h3>
      <p className="text-14 text-gray-600">{store.address}</p>
      {actionsSlot}
    </div>
  );
}

// Compose in pages:
// <StoreCard store={s} actionsSlot={<RentButton storeId={s.id} />} />
```

### Admin UI (PrimeReact)

```tsx
// features/admin-store/ui/store-table.tsx
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
```

---

## Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `StoreCard.tsx` |
| Hooks | camelCase, use- prefix | `use-create-store.ts` |
| API object | camelCase, Api suffix | `store-api.ts` |
| Query factory | camelCase, Queries suffix | `store.queries.ts` |
| Domain Types | PascalCase, T prefix | `TStoreListDetail` |
| Recoil Atoms | camelCase, State suffix | `selectedStoreIdState` |
| Recoil Keys | Namespaced | `"store/selectedStoreId"` |
| Zod Schemas | camelCase, Schema suffix | `signUpSchema` |
