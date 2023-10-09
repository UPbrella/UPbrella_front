import Card from "@/components/organisms/Card";
import { useGetStoreDetail } from "@/hooks/queries/storeQueries";
import { useParams } from "react-router-dom";

const OfficeDetailPage = () => {
  const { id } = useParams();
  const parsedId = id ? parseInt(id) : 1;
  const { data: useGetStoreDetailData } = useGetStoreDetail(parsedId);

  return (
    <>
      {useGetStoreDetailData && (
        <div className="flex items-center justify-center h-full xl:mr-8">
          <Card storeDetail={useGetStoreDetailData} />
        </div>
      )}
    </>
  );
};

export default OfficeDetailPage;
