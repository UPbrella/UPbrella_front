import ImgSwiper from "@/components/organisms/ImgSwiper/index";
import RentalInfoCard from "@/components/organisms/RentalInfoCard/index";
import { TStoreListDetail } from "@/types/admin/StoreTypes";

export type TCard = {
  storeDetail: TStoreListDetail;
  maxWidth?: number;
  maxHeight?: number;
};

const Card = ({ storeDetail, maxWidth, maxHeight }: TCard) => {
  // 매개변수를 객체로 받아야 함
  return (
    <div className="flex-col justify-center items-center gap-[16px]">
      <ImgSwiper
        maxWidth={maxWidth ?? 400}
        maxHeight={maxHeight ?? 280}
        images={storeDetail.imageUrls}
      />
      <RentalInfoCard storeDetail={storeDetail} />
    </div>
  );
};

export default Card;
