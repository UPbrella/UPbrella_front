import { useGetUserStatus } from "@/hooks/queries/userQueries";
import { redirectUrl } from "@/recoil";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";

const PrivateRoutes: React.FC = () => {
  const { pathname, search } = useLocation();
  const { isLoading, isError } = useGetUserStatus();

  const path = pathname + search;
  const setRedirectUrl = useSetRecoilState(redirectUrl);

  if (isLoading) return <></>;
  if (isError) {
    setRedirectUrl(path);
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <div className="min-h-[100vh] pb-20 flex flex-col">
      <Outlet />
    </div>
  );
};

export default PrivateRoutes;
