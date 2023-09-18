import HeaderContents from "@/components/molecules/Header/HeaderContents";
import { useGetUserStatus } from "@/hooks/queries/userQueries";

export const HeaderContainer = () => {
  const { data, isLoading } = useGetUserStatus();

  return (
    <div className="h-80">
      <HeaderContents isLoading={isLoading} name={data ? data.data.data.name : null} />
    </div>
  );
};
