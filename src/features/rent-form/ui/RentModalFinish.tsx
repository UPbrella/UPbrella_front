import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

type RentModalFinishProps = {
  handleCloseLockPwModal: () => void;
  lockNumber: string;
  setIsOpenStorageIssue: (value: boolean) => void;
  setIsRent: (value: boolean) => void;
};

const RentModalFinish = ({
  handleCloseLockPwModal,
  lockNumber,
  setIsOpenStorageIssue,
  setIsRent,
}: RentModalFinishProps) => {
  const { t } = useTranslation();

  return (
    <div className="w-full flex flex-col justify-between m-10">
      <div className="flex flex-col">
        <p className="text-18 font-bold">{t("rent.finish.title")}</p>
      </div>
      <div className="flex flex-col text-15 leading-22 text-gray-700 mt-16">
        <div>
          {t("rent.finish.lockPassword")} <p className="inline font-bold">{lockNumber}</p>
        </div>
        <div>
          <div>{t("rent.finish.lockGuide")}</div>
          <div>{t("rent.finish.thanks")}</div>
          <div className="mt-16 text-primary-500 font-semibold text-14 leading-20">
            {t("rent.finish.refundNotice")}
          </div>
        </div>
      </div>
      <div className="flex mt-16 h-48">
        <button
          className="w-192 rounded-8 bg-primary-200 font-semibold text-16 leading-24 text-primary-500 mr-8"
          onClick={() => {
            setIsOpenStorageIssue(true);
            handleCloseLockPwModal();
          }}
        >
          {t("rent.finish.storageIssue")}
        </button>
        <button
          className="w-80 rounded-8 bg-primary-500 text-white font-semibold text-16 leading-24"
          onClick={() => {
            handleCloseLockPwModal();
            toast.success(t("toast.success.rentSubmit"));
            setIsRent(true);
          }}
        >
          {t("common.btn.confirm")}
        </button>
      </div>
    </div>
  );
};

export default RentModalFinish;
