# FSD Import Rules

## Core Rule

Import only from layers **strictly below**. Never from same layer. Only via `index.ts`.

## Violations

```tsx
import { UserAvatar } from "@/entities/user";       // ❌ from entities/store (same layer)
import { useAuth } from "@/features/auth";           // ❌ from features/rent-form (same layer)
import { StoreCard } from "@/entities/store";        // ❌ from shared/ui (higher layer)
```

## Correct

```tsx
// app/App.tsx → pages
import { RentalLocationPage } from "@/pages/rental-location";

// pages → widgets, entities, shared
import { NaverMap } from "@/widgets/naver-map";
import { StoreList } from "@/entities/store";
import { SeoMetaTag } from "@/shared/ui";

// features → entities, shared
import { storeApi, storeQueries } from "@/entities/store";

// entities → shared
import { $axios } from "@/shared/api";
```

---

## Cross-Slice Patterns

### @x Notation (Entity-to-Entity only)

When entities must reference each other:

```
entities/store/@x/umbrella.ts   # Special API for umbrella entity
```

```tsx
// entities/store/@x/umbrella.ts
export { storeApi } from "../api/store-api";
export type { TStoreListDetail } from "../model/types";

// entities/umbrella/model/types.ts
import type { TStoreListDetail } from "@/entities/store/@x/umbrella";
```

Minimize @x usage. Prefer entity relationships in higher layers.

### Slots/Render Props

Entity UI accepts slots for content from other layers:

```tsx
// entities/store/ui/store-card.tsx
interface StoreCardProps {
  store: TStoreListDetail;
  actionsSlot?: React.ReactNode;
  mapSlot?: React.ReactNode;
}

// pages/ — compose there
<StoreCard
  store={store}
  mapSlot={<NaverMap lat={store.latitude} lng={store.longitude} />}
  actionsSlot={<RentButton storeId={store.id} />}
/>
```

### Props Passing

```tsx
// ❌ Entity fetching another entity
export function StoreCard({ store }) {
  const { data: umbrellas } = useUmbrellas(store.id); // same layer import!
}

// ✅ Accept data as prop
export function StoreCard({ store, umbrellaCount }: StoreCardProps) {
  return <span>{umbrellaCount}개 대여 가능</span>;
}
```

---

## eslint-plugin-boundaries Config

```json
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
