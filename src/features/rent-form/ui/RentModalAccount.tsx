import { useTranslation } from "react-i18next";

type RentModalAccountProps = {
  handleCloseDepositModal: () => void;
  umbrellaUuid: number;
  region: string;
  storeName: string;
  umbrellaId: number;
  conditionReport?: string;
  storeId: number;
  onClickPostBtn: () => void;
};

const RentModalAccount = ({
  handleCloseDepositModal,
  storeName,
  umbrellaUuid,
  onClickPostBtn,
}: RentModalAccountProps) => {
  const { t } = useTranslation();

  const handleFinishDepositModal = () => {
    onClickPostBtn();
  };

  return (
    <div className="flex flex-col w-full m-10">
      <div className="flex flex-col">
        <div className="font-bold text-18">
          <p className="inline font-normal">'</p>
          {storeName}
          <p className="inline font-normal">'{t("rent.modal.afterQuotedStore")}</p>
        </div>
        <div className="font-bold text-18">
          <p className="inline font-normal">'</p>
          {umbrellaUuid}
          <p className="inline font-normal">'{t("rent.modal.afterQuotedUmbrellaRent")}</p>
        </div>
      </div>
      <div className="flex flex-col mt-20 text-primary-500 ">
        <div>{t("rent.modal.blacklistWarning1")}</div>
        <div>{t("rent.modal.blacklistWarning2")}</div>
      </div>
      <div className="flex mt-20">
        <div
          className="py-12 mr-8 text-center text-gray-700 border border-gray-300 w-80 rounded-8"
          onClick={handleCloseDepositModal}
        >
          {t("common.btn.cancel")}
        </div>
        <div
          className="w-[calc(100%-80px)] font-semibold leading-24  mr-8 rounded-8 text-white py-12 text-center bg-primary-500 cursor-pointer"
          onClick={handleFinishDepositModal}
        >
          {t("common.btn.confirm")}
        </div>
      </div>
    </div>
  );
};

export default RentModalAccount;
