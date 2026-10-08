import { useGetUserStatus } from "@/entities/user";
import { NOT_LAYOUT_ROUTES_URL } from "@/app/router/routes";
import { useAuthStore } from "@/features/auth";
import { trackOnce } from "@/shared/lib/analytics";
import React, { useEffect } from "react";
import { Navigate, Outlet, matchPath, useLocation } from "react-router-dom";

const isMockMode = import.meta.env.VITE_MOCK_MODE === "true";

const PrivateRoutes: React.FC = () => {
  const { pathname, search } = useLocation();
  const { isLoading, isError } = useGetUserStatus();

  const path = pathname + search;
  const setRedirectUrl = useAuthStore((s) => s.setRedirectUrl);

  // QR 스캔으로 대여 폼 진입 = 대여 시도. 로그인 확인 전에 집계해야 로그인 이탈까지 보인다
  useEffect(() => {
    const rentForm = matchPath(NOT_LAYOUT_ROUTES_URL.rent.path(), pathname);

    if (!rentForm?.params.id) {
      return;
    }

    trackOnce(`click_rent:${rentForm.params.id}`, "click_rent", {
      umbrella_id: Number(rentForm.params.id),
    });
  }, [pathname]);

  useEffect(() => {
    if (!isMockMode && isError) {
      setRedirectUrl(path);
    }
  }, [isError, path, setRedirectUrl]);

  if (!isMockMode && isLoading) return <></>;
  if (!isMockMode && isError) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <div className="min-h-[100vh] pb-20 flex flex-col">
      <Outlet />
    </div>
  );
};

export default PrivateRoutes;
