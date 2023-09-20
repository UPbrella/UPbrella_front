import { loginState, redirectUrl } from "@/recoil";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

const PrivateRoutes: React.FC = () => {
  const authState = useRecoilValue(loginState);
  const { pathname } = useLocation();
  const setRedirectUrl = useSetRecoilState(redirectUrl);
  setRedirectUrl(pathname);

  return authState ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
