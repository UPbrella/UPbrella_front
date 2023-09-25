import UmbrellaSharpIcon from "@mui/icons-material/UmbrellaSharp";
import AccessTimeSharpIcon from "@mui/icons-material/AccessTimeSharp";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import { TMobileCard } from "@/components/molecules/MobileCard";

const MobileCardInfo = ({ storeDetail }: TMobileCard) => {
  const labels = [
    {
      icon: <UmbrellaSharpIcon className="text-gray-400 mr-16" />,
      text: (
        <span>
          대여가능 우산{" "}
          <span className="text-primary-500 font-bold">{storeDetail.availableUmbrellaCount}</span>{" "}
          개
        </span>
      ),
    },
    {
      icon: <AccessTimeSharpIcon className="text-gray-400 mr-16" />,
      text: <span>{storeDetail.businessHours}</span>,
    },
    {
      icon: <CallOutlinedIcon className="text-gray-400 mr-16" />,
      text: <span>{storeDetail.businessHours}</span>,
    },

    {
      icon: <PlaceOutlinedIcon className="text-gray-400 mr-16" />,
      text: <div className="flex flex-col">{storeDetail.address}</div>,
    },
  ];

  return (
    <div className="text-gray-700">
      {labels.map((label, index) => (
        <div key={index}>
          <div className="flex my-4 text-gray-700">
            {label.icon}
            {label.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MobileCardInfo;
