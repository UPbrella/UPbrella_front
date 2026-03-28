import { useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useNavigate } from "react-router-dom";
import { useGetUserStatus } from "@/entities/user";
import { BASIC_ROUTES_URL } from "@/app/router/routes";
import SeoMetaTag from "@/shared/ui/SeoMetaTag";

const isMockMode = import.meta.env.VITE_MOCK_MODE === "true";

const AdminRoutes = () => {
  const { t } = useTranslation();
  const { data, isLoading, isError } = useGetUserStatus();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!isMockMode && (isError || (data && !data.data.data.adminStatus)))
      return navigate(BASIC_ROUTES_URL.forbidden.path(), { replace: true });
  }, [data, isError, navigate]);

  if (!isMockMode && isLoading) {
    return <></>;
  }

  return (
    <>
      <SeoMetaTag title={t("common.nav.admin")} />
      <div className="pb-20">
        <Outlet />
      </div>
    </>
  );
};

export default AdminRoutes;
