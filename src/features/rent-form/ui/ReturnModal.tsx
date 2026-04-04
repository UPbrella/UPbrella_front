import { useMemo } from "react";
import { useTranslation } from "react-i18next";

type ReturnModalProps = {
  classificationName: string;
  rentStoreName: string;
  umbrellaUuid: number;
  elapsedDay: number;
  bank: string;
  accountNumber: string;
  setIsOpenModal: (value: boolean) => void;
  onClickPatchBtn: () => void;
};

const ReturnModal = ({
  classificationName,
  rentStoreName,
  umbrellaUuid,
  elapsedDay,
  bank,
  accountNumber,
  setIsOpenModal,
  onClickPatchBtn,
}: ReturnModalProps) => {
  const { t } = useTranslation();

  const returnModalTable = useMemo(
    () =>
      ({
        classificationName: {
          label: t("return.modal.region"),
          value: classificationName,
        },
        rentStoreName: {
          label: t("return.modal.rentStore"),
          value: rentStoreName,
        },
        umbrellaUuid: {
          label: t("return.modal.umbrellaNo"),
          value: `${umbrellaUuid}${t("return.modal.numberSuffix")}`,
        },
        elapsedDay: {
          label: t("return.modal.rentDays"),
          value: `${elapsedDay}${t("return.modal.daySuffix")}`,
        },
        bank: {
          label: t("return.modal.refundAccount"),
          value: `${bank} ${accountNumber}`,
        },
      } satisfies Record<
        keyof Omit<ReturnModalProps, "accountNumber" | "setIsOpenModal" | "onClickPatchBtn">,
        { label: string; value: string | number }
      >),
    [t, classificationName, rentStoreName, umbrellaUuid, elapsedDay, bank, accountNumber]
  );

  return (
    <div className="flex flex-col max-w-2xl px-20 pt-10 pb-5 w-320">
      <div className="mb-16 text-black text-18 leading-24">
        <span className="font-normal">{"'"}</span>
        <span className="font-bold">{rentStoreName}</span>
        <span className="font-normal">{"'"}</span>
        {t("return.modal.afterQuotedStore")}
        <br />
        <span className="font-normal">{"'"}</span>
        <span className="font-bold">{umbrellaUuid}</span>
        <span className="font-normal">{"'"}</span>
        {t("return.modal.afterQuotedUmbrellaReturn")}
      </div>

      <div>
        <div>
          {Object.keys(returnModalTable).map((key) => {
            const column = key as keyof Omit<
              ReturnModalProps,
              "accountNumber" | "setIsOpenModal" | "onClickPatchBtn"
            >;
            return (
              <div key={column}>
                <div className="flex text-gray-700 text-14 leading-20">
                  <div className="font-semibold w-100">{returnModalTable[column].label}</div>
                  <span>{returnModalTable[column].value}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="my-16 text-gray-600 text-14 leading-20">
          {t("return.modal.editNotice")} <br />
          {elapsedDay > 14 ? (
            <span>{t("return.modal.refundOverdue")}</span>
          ) : (
            <span>{t("return.modal.refundNormal")}</span>
          )}
        </div>
        <div className="mb-16 text-gray-600 text-14 leading-20">{t("return.modal.thanks")}</div>
      </div>

      <div className="flex justify-between h-48">
        <button
          className="w-1/2 mr-8 font-semibold text-gray-700 bg-white border border-gray-300 border-1 rounded-8 text-16 leading-24"
          onClick={() => setIsOpenModal(false)}
        >
          {t("return.modal.edit")}
        </button>
        <button
          className="w-1/2 font-semibold text-white rounded-8 bg-primary-500 text-16 leading-24"
          onClick={() => {
            setIsOpenModal(false);
            onClickPatchBtn();
          }}
        >
          {t("return.modal.complete")}
        </button>
      </div>
    </div>
  );
};

export default ReturnModal;
