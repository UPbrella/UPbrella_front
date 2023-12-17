import { loginState, redirectUrl } from "@/recoil";
import React, { useLayoutEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

const PrivateRoutes: React.FC = () => {
  const authState = useRecoilValue(loginState);
  const { pathname, search } = useLocation();
  const path = pathname + search;

  const setRedirectUrl = useSetRecoilState(redirectUrl);

  useLayoutEffect(() => {
    if (!authState) {
      setRedirectUrl(path);
    }
  }, [authState, path, setRedirectUrl]);

  if (!authState) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <div className="min-h-[100vh] pb-20 flex flex-col">
      <Outlet />
    </div>
  );
};

export default PrivateRoutes;
