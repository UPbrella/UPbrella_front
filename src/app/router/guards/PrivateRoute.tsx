import { useGetUserStatus } from "@/entities/user";
import { redirectUrl } from "@/features/auth";
import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";

const isMockMode = import.meta.env.VITE_MOCK_MODE === "true";

const PrivateRoutes: React.FC = () => {
  const { pathname, search } = useLocation();
  const { isLoading, isError } = useGetUserStatus();

  const path = pathname + search;
  const setRedirectUrl = useSetRecoilState(redirectUrl);

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
