import NaverDirectionBtn from "@/components/atoms/NaverDirectionBtn";
import RentalLocationTitle from "@/components/atoms/RentalLocationTitle";
import StoreDetailMockData from "@/mocks/StoreDetail";
import UmbrellaSharpIcon from "@mui/icons-material/UmbrellaSharp";
import AccessTimeSharpIcon from "@mui/icons-material/AccessTimeSharp";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import WavingHandOutlinedIcon from "@mui/icons-material/WavingHandOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";

const RentalInfoCard = () => {
  const firstData = StoreDetailMockData.StoreDetailMockData[0];

  const labels = [
    {
      icon: <UmbrellaSharpIcon className="text-gray-400 mr-16" />,
      text: (
        <span>
          대여가능 우산{" "}
          <span className="text-primary-500 font-bold">{firstData.umbrellaCount}</span> 개
        </span>
      ),
    },
    {
      icon: <AccessTimeSharpIcon className="text-gray-400 mr-16" />,
      text: <span>{firstData.businessHours}</span>,
    },
    {
      icon: <CallOutlinedIcon className="text-gray-400 mr-16" />,
      text: <span>{firstData.contactNumber}</span>,
    },
    {
      icon: <InstagramIcon className="text-gray-400 mr-16" />,
      text: <span>@{firstData.instagramId}</span>,
    },
    {
      icon: <PlaceOutlinedIcon className="text-gray-400 mr-16" />,
      text: (
        <div className="flex flex-col">
          {firstData.storeLocation}{" "}
          <span className="text-primary-500">{firstData.umbrellaLocation}</span>
        </div>
      ),
    },
    {
      icon: <WavingHandOutlinedIcon className="text-gray-400 mr-16" />,
      text: <span>{firstData.content}</span>,
    },
  ];

  return (
    <div className="border-gray-200 border w-400 h-600 rounded-20 px-24 pt-32 mt-16">
      <RentalLocationTitle title={firstData.name} category={firstData.category} />
      <div className="pt-24 pb-6">
        <NaverDirectionBtn />
      </div>
      <div className="mt-18 text-gray-700">
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
