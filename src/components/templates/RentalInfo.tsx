import React from "react";
import ImgSwiper from "../organisms/ImgSwiper";
import RentalInfoCard from "../organisms/RentalInfoCard";

export default function RentalInfo() {
  return (
    <div className="flex-col">
      <ImgSwiper />
      <RentalInfoCard />
    </div>
  );
}
