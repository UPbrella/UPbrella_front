import { loginState, redirectUrl } from "@/recoil";
import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

const PrivateRoutes: React.FC = () => {
  const authState = useRecoilValue(loginState);
  // const { pathname } = useLocation();
  const pathname = window.location.pathname + window.location.search;
  const setRedirectUrl = useSetRecoilState(redirectUrl);

  useEffect(() => {
    setRedirectUrl(pathname);
  }, [pathname, setRedirectUrl]);

  return authState ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
