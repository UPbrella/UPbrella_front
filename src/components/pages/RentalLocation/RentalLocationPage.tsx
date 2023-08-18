import CardFooter from "@/components/organisms/CardFooter";
import ImgSwiper from "@/components/organisms/ImgSwiper";
import NaverMap from "@/components/organisms/NaverMap/index";
import RentalInfoCard from "@/components/organisms/RentalInfoCard";

const initialLatitude = 37.56085742773332;
const initialLongitude = 126.93548935431897;

export default function RentalInfo() {
  return (
    <div className="flex flex-col ">
      <div className="flex">
        <div className="flex flex-col">
          <ImgSwiper />
          <RentalInfoCard />
        </div>
        <div>
          <NaverMap
            defaultLat={initialLatitude}
            defaultLon={initialLongitude}
            addMarker={true}
            addLabel={true}
            labelContent={"연세대학교 공학원"}
          />
        </div>
      </div>
      <CardFooter />
    </div>
  );
}
