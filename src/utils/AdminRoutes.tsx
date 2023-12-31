import { useLayoutEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useGetUserStatus } from "@/hooks/queries/userQueries";
import { BASIC_ROUTES_URL } from "@/routes/basicRouter";
import SeoMetaTag from "@/utils/SeoMetaTag";

// adminStatus checking
const AdminRoutes = () => {
  const { data, isLoading, isError } = useGetUserStatus();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (isError || (data && !data.data.data.adminStatus))
      return navigate(BASIC_ROUTES_URL.forbidden.path(), { replace: true });
  }, [data, isError, navigate]);

  // hack
  if (isLoading) {
    return <></>;
  }

  return (
    <>
      <SeoMetaTag title={"어드민"} />
      <div className="pb-20">
        <Outlet />
      </div>
    </>
  );
};

export default AdminRoutes;
