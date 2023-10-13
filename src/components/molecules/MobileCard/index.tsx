import MobileCardInfo from "@/components/atoms/MobileCardInfo";
import NaverDirectionBtn from "@/components/atoms/NaverDirectionBtn";
import { TStoreListDetail } from "@/types/admin/StoreTypes";
import DetailBtn from "@/components/atoms/DetailBtn";

export type TMobileCard = {
  storeDetail: TStoreListDetail;
};

const MobileCard = ({ storeDetail }: TMobileCard) => {
  return (
    <div className="mb-20 px-20 bg-white">
      <div className="flex justify-center items-center mb-16">
        <div className="text-gray-700 text-16 font-semibold mr-8">{storeDetail.name}</div>
        <div className="text-gray-600 text-12">{storeDetail.category}</div>
      </div>
      <div className="flex gap-x-2 mb-16">
        <img className="rounded-8 w-120 h-120" src={storeDetail.imageUrls[0]}></img>
        <MobileCardInfo storeDetail={storeDetail} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <DetailBtn id={storeDetail.id} />
        <NaverDirectionBtn
          mobile={true}
          elon={storeDetail.longitude}
          elat={storeDetail.latitude}
          address={storeDetail.address}
        />
      </div>
    </div>
  );
};

export default MobileCard;
