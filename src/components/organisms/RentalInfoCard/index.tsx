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
  return (
    <div className="w-full px-24 py-20 overflow-auto border border-gray-200 xl:py-32 rounded-20 max-h-600">
      <RentalLocationTitle title={storeDetail.name} category={storeDetail.category} />
      <div className="pt-24 pb-6">
        <NaverDirectionBtn
          elon={storeDetail.longitude}
          elat={storeDetail.latitude}
          address={storeDetail.address}
        />
      </div>
      <div className="text-gray-700 mt-18 flex flex-col gap-[16px]">
        <AvailableUmbrella availableUmbrellaCount={storeDetail.availableUmbrellaCount} />
        {storeDetail.businessHours && <BusinessHours businessHours={storeDetail.businessHours} />}
        {storeDetail.contactNumber && <ContactNumber contactNumber={storeDetail.contactNumber} />}
        {storeDetail.instaUrl && <SnsURI instaUrl={storeDetail.instaUrl} />}
        {(storeDetail.address || storeDetail.umbrellaLocation) && (
          <Address address={storeDetail.address} umbrellaLocation={storeDetail.umbrellaLocation} />
        )}
        {storeDetail.description && <Description description={storeDetail.description} />}
      </div>
    </div>
  );
};

export default RentalInfoCard;

const AvailableUmbrella = ({ availableUmbrellaCount }: { availableUmbrellaCount: number }) => {
  return (
    <div className="flex gap-[16px]">
      <UmbrellaSharpIcon className="text-gray-400" />
      <span>
        대여가능 우산 <span className="font-bold text-primary-500">{availableUmbrellaCount}</span>{" "}
        개
      </span>
    </div>
  );
};

const BusinessHours = ({ businessHours }: { businessHours: string }) => {
  return (
    <div className="flex gap-[16px]">
      <AccessTimeSharpIcon className="text-gray-400" />
      <span>{businessHours}</span>
    </div>
  );
};

const ContactNumber = ({ contactNumber }: { contactNumber: string }) => {
  return (
    <div className="flex gap-[16px]">
      <CallOutlinedIcon className="text-gray-400" />
      <span>{contactNumber}</span>
    </div>
  );
};

const SnsURI = ({ instaUrl }: { instaUrl: string }) => {
  return (
    <div className="flex gap-[16px]">
      <InstagramIcon className="text-gray-400" />
      <a
        href={`https://www.instagram.com/${instaUrl}/`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline hover:text-blue-800 visited:text-purple-600"
      >
        @{instaUrl}
      </a>
    </div>
  );
};

const Address = ({ address, umbrellaLocation }: { address: string; umbrellaLocation: string }) => {
  return (
    <div className="flex gap-[16px]">
      <PlaceOutlinedIcon className="text-gray-400" />
      <div className="flex flex-col">
        {address} <span className="text-primary-500">{umbrellaLocation}</span>
      </div>
    </div>
  );
};

const Description = ({ description }: { description: string }) => {
  return (
    <div className="flex gap-[16px]">
      <WavingHandOutlinedIcon className="text-gray-400" />
      <span className="whitespace-pre-wrap">{description}</span>
    </div>
  );
};
