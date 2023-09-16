import ImgSwiper from "@/components/organisms/ImgSwiper/index";
import RentalInfoCard from "@/components/organisms/RentalInfoCard/index";
// import { TStoreListDetail } from "@/types/admin/StoreTypes";

// export type TCard = {
//   storeDetail: TStoreListDetail;
// };
const Card = () => {
  return (
    <div className="flex-col">
      <ImgSwiper maxWidth={400} maxHeight={280} />
      <RentalInfoCard />
    </div>
  );
};

export default Card;
