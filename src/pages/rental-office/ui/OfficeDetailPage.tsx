import Card from "@/entities/store/ui/Card";
import { useGetStoreDetail } from "@/entities/store/api/store.queries";
import SeoMetaTag from "@/shared/ui/SeoMetaTag";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const OfficeDetailPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const parsedId = id ? parseInt(id) : 1;
  const { data: useGetStoreDetailData } = useGetStoreDetail(parsedId);

  return (
    <>
      <SeoMetaTag
        title={t("seo.officeDetail.title")}
        description={t("seo.officeDetail.desc")}
        keywords={t("seo.officeDetail.keywords")}
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
