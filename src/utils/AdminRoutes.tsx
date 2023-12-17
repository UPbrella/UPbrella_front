import { useLayoutEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useGetUserStatus } from "@/hooks/queries/userQueries";
import { NOT_LAYOUT_ROUTES_URL } from "@/routes/notLayoutRouter";

// adminStatus checking
const AdminRoutes = () => {
  const { data, isLoading, isError } = useGetUserStatus();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (isError || (data && !data.data.data.adminStatus))
      return navigate(NOT_LAYOUT_ROUTES_URL.forbidden.path(), { replace: true });
  }, [data, isError, navigate]);

  // hack
  if (isLoading) {
    return <></>;
  }

  return (
    <div className="pb-20">
      <Outlet />
    </div>
  );
};

export default AdminRoutes;
