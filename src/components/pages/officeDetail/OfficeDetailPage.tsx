import Card from "@/components/organisms/Card";
import { useGetStoreDetail } from "@/hooks/queries/storeQueries";
import SeoMetaTag from "@/utils/SeoMetaTag";
import { useParams } from "react-router-dom";

const OfficeDetailPage = () => {
  const { id } = useParams();
  const parsedId = id ? parseInt(id) : 1;
  const { data: useGetStoreDetailData } = useGetStoreDetail(parsedId);

  return (
    <>
      <SeoMetaTag
        title={"협업 지점 소개"}
        description={"업브렐라와 함께하는 협업 지점 소개 페이지입니다."}
        keywords={", 대여소, 지점, 소개"}
      />

      {useGetStoreDetailData && (
        <div className="flex items-center justify-center h-full mt-20 mb-24 ">
          <Card storeDetail={useGetStoreDetailData} />
        </div>
      )}
    </>
  );
};

export default OfficeDetailPage;
