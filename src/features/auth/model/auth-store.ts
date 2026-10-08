import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LEGACY_AUTH_KEY, readLegacyAuth } from "./legacy-auth";

const AUTH_STORAGE_KEY = "upbrella-auth";

type TAuthState = {
  isLogin: boolean;
  redirectUrl: string;
  setIsLogin: (isLogin: boolean) => void;
  setRedirectUrl: (redirectUrl: string) => void;
};

// 새 키가 아직 없으면 recoil-persist 값으로 시작 → 배포 후에도 로그인 유지
const legacy = readLegacyAuth(localStorage.getItem(LEGACY_AUTH_KEY));

export const useAuthStore = create<TAuthState>()(
  persist(
    (set) => ({
      isLogin: legacy.isLogin,
      redirectUrl: legacy.redirectUrl,
      setIsLogin: (isLogin) => set({ isLogin }),
      setRedirectUrl: (redirectUrl) => set({ redirectUrl }),
    }),
    {
      name: AUTH_STORAGE_KEY,
      partialize: ({ isLogin, redirectUrl }) => ({ isLogin, redirectUrl }),
    }
  )
);
