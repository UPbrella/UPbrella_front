import ImgSwiper from "@/widgets/image-swiper/ui/ImgSwiper";
import RentalInfoCard from "@/entities/store/ui/RentalInfoCard";
import { TStoreListDetail } from "@/entities/store/model/types";
import CardFooter from "./CardFooter";

type TCard = {
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
