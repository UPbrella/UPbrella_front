import ImgSwiper from "@/components/organisms/ImgSwiper/index";
import RentalInfoCard from "@/components/organisms/RentalInfoCard/index";
import { TStoreListDetail } from "@/types/admin/StoreTypes";
import CardFooter from "../CardFooter";

export type TCard = {
  storeDetail: TStoreListDetail;
};

const Card = ({ storeDetail }: TCard) => {
  return (
    <div className="flex-col justify-center items-center flex gap-[16px] w-full max-w-[640px]">
      <ImgSwiper images={storeDetail.imageUrls} />
      <RentalInfoCard storeDetail={storeDetail} />
      <CardFooter />
    </div>
  );
};

export default Card;
