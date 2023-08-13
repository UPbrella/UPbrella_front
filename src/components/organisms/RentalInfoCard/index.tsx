import NaverDirectionBtn from "@/components/atoms/NaverDirectionBtn";
import RentalLocationTitle from "@/components/atoms/RentalLocationTitle";
import StoreDetailMockData from "@/mocks/StoreDetail";
import UmbrellaSharpIcon from "@mui/icons-material/UmbrellaSharp";
import AccessTimeSharpIcon from "@mui/icons-material/AccessTimeSharp";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import WavingHandOutlinedIcon from "@mui/icons-material/WavingHandOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import React from "react";

type TProps = {
  children: React.ReactNode;
};

const LabelWrapper = ({ children }: TProps) => {
  return <div className="mt-18 text-gray-700">{children}</div>;
};

const LabelWithIcon = (icon?: React.ReactNode, content?: React.ReactNode) => {
  return (
    <LabelWrapper>
      {icon}
      {content}
    </LabelWrapper>
  );
};

const RentalInfoCard = () => {
  const firstData = StoreDetailMockData.StoreDetailMockData[0];

  const labels = [
    LabelWithIcon(
      <UmbrellaSharpIcon className="text-gray-400 mr-16" />,
      `대여가능 우산 ${firstData.umbrellaCount} 개`
    ),
    LabelWithIcon(<AccessTimeSharpIcon className="text-gray-400 mr-16" />, firstData.businessHours),
    LabelWithIcon(<CallOutlinedIcon className="text-gray-400 mr-16" />, firstData.contactNumber),
    LabelWithIcon(<InstagramIcon className="text-gray-400 mr-16" />, `@${firstData.instagramId}`),
    LabelWithIcon(
      <PlaceOutlinedIcon className="text-gray-400 mr-16" />,
      `${firstData.storeLocation}`
    ),
    <div className="text-primary-500 ml-40">{firstData.umbrellaLocation}</div>,
    LabelWithIcon(<WavingHandOutlinedIcon className="text-gray-400 mr-16" />, firstData.content),
  ];

  return (
    <div className="border-gray-200 border w-400 h-600 rounded-20 px-24 pt-32 mt-16">
      <RentalLocationTitle title={firstData.name} category={firstData.category} />
      <div className="pt-24 pb-6">
        <NaverDirectionBtn />
      </div>
      {labels}
    </div>
  );
};

export default RentalInfoCard;
