import NaverDirectionBtn from "@/components/atoms/NaverDirectionBtn";
import RentalLocationTitle from "@/components/atoms/RentalLocationTitle";
import UmbrellaSharpIcon from "@mui/icons-material/UmbrellaSharp";
import AccessTimeSharpIcon from "@mui/icons-material/AccessTimeSharp";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import WavingHandOutlinedIcon from "@mui/icons-material/WavingHandOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import { TStoreListDetail } from "@/types/admin/StoreTypes";

export type TRentalCard = {
  storeDetail: TStoreListDetail;
};

const RentalInfoCard = ({ storeDetail }: TRentalCard) => {
  const labels = [
    {
      icon: <UmbrellaSharpIcon className="mr-16 text-gray-400" />,
      text: (
        <span>
          대여가능 우산{" "}
          <span className="font-bold text-primary-500">{storeDetail.availableUmbrellaCount}</span>{" "}
          개
        </span>
      ),
    },
    {
      icon: <AccessTimeSharpIcon className="mr-16 text-gray-400" />,
      text: <span>{storeDetail.businessHours}</span>,
    },
    {
      icon: <CallOutlinedIcon className="mr-16 text-gray-400" />,
      text: <span>{storeDetail.contactNumber}</span>,
    },
    {
      icon: <InstagramIcon className="mr-16 text-gray-400" />,
      text: <span>@{storeDetail.instaUrl}</span>,
    },
    {
      icon: <PlaceOutlinedIcon className="mr-16 text-gray-400" />,
      text: (
        <div className="flex flex-col">
          {storeDetail.address}{" "}
          <span className="text-primary-500">{storeDetail.umbrellaLocation}</span>
        </div>
      ),
    },
    {
      icon: <WavingHandOutlinedIcon className="mr-16 text-gray-400" />,
      text: <span>{storeDetail.description}</span>,
    },
  ];

  return (
    <div className={"border-gray-200 border h-600 rounded-20 px-24 pt-32 sm:max-w-320"}>
      <RentalLocationTitle title={storeDetail.name} category={storeDetail.category} />
      <div className="pt-24 pb-6">
        <NaverDirectionBtn
          elon={storeDetail.longitude}
          elat={storeDetail.latitude}
          address={storeDetail.address}
        />
      </div>
      <div className="text-gray-700 mt-18">
        {labels.map((label, index) => (
          <div key={index}>
            <div className="flex mb-16 text-gray-700">
              {label.icon}
              {label.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RentalInfoCard;
