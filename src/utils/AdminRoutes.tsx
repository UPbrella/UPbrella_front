import { useLayoutEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useGetUserStatus } from "@/hooks/queries/userQueries";

// adminStatus checking
const AdminRoutes = () => {
  const { data, isLoading, isError } = useGetUserStatus();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (isError || (data && !data.data.data.adminStatus))
      return navigate("/forbidden", { replace: true });
  }, [data, isError, navigate]);

  // hack
  if (isLoading) {
    return <></>;
  }

  return <Outlet />;
};

export default AdminRoutes;
