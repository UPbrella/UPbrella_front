import ImgSwiper from "@/components/organisms/ImgSwiper/index";
import RentalInfoCard from "@/components/organisms/RentalInfoCard/index";
import { TStoreListDetail } from "@/types/admin/StoreTypes";
import CardFooter from "../CardFooter";
import { useEffect, useState } from "react";


export type TCard = {
  storeDetail: TStoreListDetail;
};

const Card = ({ storeDetail }: TCard) => {
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(420);

  useEffect(() => {
    if (window.innerWidth < 640) {
      setWidth(320);
      setHeight(224);
    }
  }, []);

  return (
    <div className="flex-col justify-center items-center gap-[16px]">
      <ImgSwiper
        maxWidth={window.innerWidth > 1024 ? 400 : width}
        maxHeight={window.innerWidth > 1024 ? 280 : height}
        images={storeDetail.imageUrls}
      />
      <RentalInfoCard storeDetail={storeDetail} />
      <CardFooter />
    </div>
  );
};

export default Card;
