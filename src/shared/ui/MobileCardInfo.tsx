import UmbrellaSharpIcon from "@mui/icons-material/UmbrellaSharp";
import AccessTimeSharpIcon from "@mui/icons-material/AccessTimeSharp";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import { TMobileCard } from "@/entities/store/ui/MobileCard";
import { useTranslation } from "react-i18next";

const MobileCardInfo = ({ storeDetail }: TMobileCard) => {
  const { t } = useTranslation();
  const labels = [
    {
      icon: <UmbrellaSharpIcon className="text-gray-400 mr-16" />,
      text: (
        <span>
          {t("store.availableUmbrella")}{" "}
          <span className="text-primary-500 font-bold">{storeDetail.availableUmbrellaCount}</span>{" "}
          {t("store.countSuffix")}
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
