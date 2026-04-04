import { TRentHistoriesRes } from "@/entities/user/api/user-api";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const { umbrellaUuid, rentedAt, rentedStore, returnAt, isRefunded, isReturned } = rentInfo;

  const color =
    isRecent && !isReturned ? `bg-primary-100 border-primary-300` : `bg-white border-gray-200`;

  const padding = isProfile ? `p-20` : `xl:p-24 lg:p-20`;

  return (
    <div className={`flex w-full text-gray-700 border border-solid ${padding} ${color} rounded-12`}>
      <div className="flex flex-col gap-2 text-15">
        <Field
          label={t("mypage.rent.umbrellaNo")}
          value={`${umbrellaUuid}${t("return.modal.numberSuffix")}`}
        />
        <Field label={t("mypage.rent.rentDate")} value={rentedAt} />
        <Field label={t("mypage.rent.rentStore")} value={rentedStore} />
        <Field
          label={t("mypage.rent.returnDue")}
          value={isReturned ? getReturnDue(rentedAt) : returnAt}
          isPrimary={!isReturned}
        />
        <Field label={t("mypage.rent.returnDate")} value={isReturned ? returnAt : ""} />
        <Field
          label={t("mypage.rent.returnStatus")}
          value={isReturned ? t("mypage.rent.returned") : t("mypage.rent.notReturned")}
        />
        <Field
          label={t("mypage.rent.refundStatus")}
          value={isRefunded ? t("mypage.rent.refunded") : t("mypage.rent.notRefunded")}
        />
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
