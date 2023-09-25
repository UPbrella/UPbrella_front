import MobileCardInfo from "@/components/atoms/MobileCardInfo";
import NaverDirectionBtn from "@/components/atoms/NaverDirectionBtn";
import { TStoreListDetail } from "@/types/admin/StoreTypes";

export type TMobileCard = {
  storeDetail: TStoreListDetail;
};

const MobileCard = (storeDetail: TMobileCard) => {
  return (
    <div className="mb-20 px-20 bg-white">
      <div className="flex justify-center items-center mb-16">
        <div className="text-gray-700 text-16 font-semibold mr-8">
          {storeDetail.storeDetail.name}
        </div>
        <div className="text-gray-600 text-12">{storeDetail.storeDetail.category}</div>
      </div>
      <div className="flex gap-x-2 mb-16">
        <img className="rounded-8 w-120 h-120" src={storeDetail.storeDetail.imageUrls[0]}></img>
        <MobileCardInfo storeDetail={storeDetail.storeDetail} />
      </div>
      <NaverDirectionBtn
        elon={storeDetail.storeDetail.longitude}
        elat={storeDetail.storeDetail.latitude}
        address={storeDetail.storeDetail.address}
      />
    </div>
  );
};

export default MobileCard;
