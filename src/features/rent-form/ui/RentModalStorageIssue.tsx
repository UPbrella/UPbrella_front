import { usePatchRentLockerCount } from "@/features/rent-form/api/form.queries";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

type RentModalStorageIssueProps = {
  setIsOpenStorageIssue: (value: boolean) => void;
  setLockNumber: (value: string) => void;
  setIsOpenLockPwModal: (value: boolean) => void;
  storeId: number;
};

const RentModalStorageIssue = ({
  setIsOpenStorageIssue,
  setLockNumber,
  setIsOpenLockPwModal,
  storeId,
}: RentModalStorageIssueProps) => {
  const { t } = useTranslation();
  const [countInput, setCountInput] = useState("");
  const { mutate, isLoading } = usePatchRentLockerCount();

  const isNumberValid = () => {
    return countInput.length === 4 && /^\d+$/.test(countInput);
  };

  const onClickPatchCountBtn = () => {
    if (isNaN(Number(countInput))) {
      toast.error(t("rent.storage.error"));
      return;
    }

    mutate(
      {
        storeMetaId: storeId,
        count: Number(countInput),
      },
      {
        onSuccess: (password) => {
          setLockNumber(password);
          setIsOpenStorageIssue(false);
          setIsOpenLockPwModal(true);
        },
      }
    );
  };

  return (
    <div className="w-full p-10">
      <div className="mb-16 font-bold text-black text-18 leading-24">{t("rent.storage.title")}</div>
      <div className="mb-16 text-gray-700 text-14 leading-20">{t("rent.storage.desc")}</div>
      <div className="flex h-48">
        <input
          className="w-full pl-12 mr-4 text-black border border-gray-300 rounded-8 text-15 leading-22 placeholder:text-gray-400 focus:border-gray-600 focus:outline-none"
          maxLength={4}
          placeholder={t("rent.storage.placeholder")}
          onChange={(e) => setCountInput(e.target.value)}
          disabled={isLoading}
        />
        <button
          className={`w-68 rounded-8 bg-primary-200 font-semibold text-16 leading-24 text-primary-500 px-10 ${
            isNumberValid() ? "" : "cursor-not-allowed opacity-25"
          }`}
          disabled={!isNumberValid() || isLoading}
          onClick={onClickPatchCountBtn}
        >
          {t("common.btn.confirm")}
        </button>
      </div>
    </div>
  );
};

export default RentModalStorageIssue;
