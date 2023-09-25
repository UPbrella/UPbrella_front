import HeaderContents from "@/components/molecules/Header/HeaderContents";
import { useGetUserStatus } from "@/hooks/queries/userQueries";

export const HeaderContainer = () => {
  const { data: userRes, isLoading } = useGetUserStatus();

  return (
    <div className="h-80">
      <HeaderContents isLoading={isLoading} userRes={userRes ? userRes.data.data : null} />
    </div>
  );
};
