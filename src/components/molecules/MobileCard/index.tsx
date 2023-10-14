import MobileCardInfo from "@/components/atoms/MobileCardInfo";
import NaverDirectionBtn from "@/components/atoms/NaverDirectionBtn";
import { TStoreListDetail } from "@/types/admin/StoreTypes";
import DetailBtn from "@/components/atoms/DetailBtn";

export type TMobileCard = {
  storeDetail: TStoreListDetail;
};

const MobileCard = ({ storeDetail }: TMobileCard) => {
  return (
    <div className="px-20 mb-20 bg-white">
      <div className="flex items-center justify-center mb-16">
        <div className="mr-8 font-semibold text-gray-700 text-16">{storeDetail.name}</div>
        <div className="text-gray-600 text-12">{storeDetail.category}</div>
      </div>
      <div className="flex mb-16 gap-x-2">
        <img className="rounded-8 w-120 h-120" src={storeDetail.imageUrls[0]}></img>
        <MobileCardInfo storeDetail={storeDetail} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <DetailBtn id={storeDetail.id} />
        <NaverDirectionBtn
          elon={storeDetail.longitude}
          elat={storeDetail.latitude}
          address={storeDetail.address}
        />
      </div>
    </div>
  );
};

export default MobileCard;
