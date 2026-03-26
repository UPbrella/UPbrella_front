import { TRentHistoriesRes } from "@/entities/user/api/user-api";
import dayjs from "dayjs";

type MypageRentSectionProps = {
  rentInfo: TRentHistoriesRes;
  isProfile: boolean;
  isRecent: boolean;
};

const LIMIT_DATE = 14;

const getReturnDue = (rentedAt: string) => {
  return dayjs(rentedAt).add(LIMIT_DATE, "day").format("YYYY-MM-DD HH:mm:ss");
};

const MypageRentSection = ({ rentInfo, isProfile, isRecent }: MypageRentSectionProps) => {
  const { umbrellaUuid, rentedAt, rentedStore, returnAt, isRefunded, isReturned } = rentInfo;

  const color =
    isRecent && !isReturned ? `bg-primary-100 border-primary-300` : `bg-white border-gray-200`;

  const padding = isProfile ? `p-20` : `xl:p-24 lg:p-20`;

  return (
    <div className={`flex w-full text-gray-700 border border-solid ${padding} ${color} rounded-12`}>
      <div className="flex flex-col gap-2 text-15">
        <Field label="우산 번호" value={`${umbrellaUuid}번`} />
        <Field label="대여 일자" value={rentedAt} />
        <Field label="대여 지점" value={rentedStore} />
        <Field
          label="반납 기한"
          value={isReturned ? getReturnDue(rentedAt) : returnAt}
          isPrimary={!isReturned}
        />
        <Field label="반납 일자" value={isReturned ? returnAt : ""} />
        <Field label="반납 여부" value={isReturned ? "반납 완료" : "반납 전"} />
        <Field label="환급 여부" value={isRefunded ? "환급 완료" : "환급 전"} />
      </div>
    </div>
  );
};

const Field = ({
  label,
  value,
  isPrimary = false,
}: {
  label: string;
  value: string;
  isPrimary?: boolean;
}) => {
  return (
    <div className={`flex gap-4 ${isPrimary ? "text-primary-700" : ""}`}>
      <p className="font-semibold">{label}</p>
      <p className="font-normal">{value}</p>
    </div>
  );
};
export default MypageRentSection;
