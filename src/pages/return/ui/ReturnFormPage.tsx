import { patchReturn } from "@/features/rent-form/api/form-api";
import BottomSheet from "@/shared/ui/BottomSheet";
import BankContent from "@/features/rent-form/ui/BankContent";
import FormBasic from "@/features/rent-form/ui/FormBasic";
import FormButton from "@/features/rent-form/ui/FormButton";
import FormStatus from "@/features/rent-form/ui/FormStatus";
import ReturnModal from "@/features/rent-form/ui/ReturnModal";
import ErrorComponent from "@/shared/ui/ErrorComponent";
import FormLocationMolecules from "@/features/rent-form/ui/FormLocationMolecules";
import FormModal from "@/features/rent-form/ui/FormModal";
import { HeaderContainer } from "@/widgets/header/ui/HeaderContainer";
import {
  useGetReturnFormData,
  useGetReturnFormLockData,
  useGetReturnUmbrella,
} from "@/features/rent-form/api/form.queries";
import { loginInfo, redirectUrl } from "@/features/auth";
import { TCustomError } from "@/shared/model/types";
import { getErrorMessage } from "@/shared/api/error";
import { formatPhoneNumber } from "@/shared/lib/utils";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useTranslation } from "react-i18next";

const ReturnPage = () => {
  const { t } = useTranslation();
  // 반납전(false), 반납후(true)
  const [isReturn, setIsReturn] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const location = useLocation();
  const storeId = new URLSearchParams(location.search).get("storeId");
  const returnStoreId = storeId ? parseInt(storeId, 10) : 0;
  const saltFromQuery = new URLSearchParams(location.search).get("salt");
  const salt = saltFromQuery ? saltFromQuery : "";
  const signatureFromQuery = new URLSearchParams(location.search).get("signature");
  const signature = signatureFromQuery ? signatureFromQuery : "";

  const userInfo = useRecoilValue(loginInfo);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [classificationName, setClassificationName] = useState("");
  const [rentStoreName, setRentStoreName] = useState("");
  const [umbrellaUuid, setUmbrellaUuid] = useState(0);
  const [bank, setBank] = useState(userInfo.bank || t("return.form.bankName"));
  const [accountNumber, setAccountNumber] = useState(userInfo.accountNumber || "");
  const [improvementReportContent, setImprovementReportContent] = useState("");
  const [elapsedDay, setElapsedDay] = useState(0);
  const maxCharLimit = 400;

  const [subError, setSubError] = useState("");

  const setRedirectUrl = useSetRecoilState(redirectUrl);

  useEffect(() => {
    setRedirectUrl("/");
  }, [setRedirectUrl]);

  useEffect(() => {
    setName(userInfo.name);
    const formattedPhone = formatPhoneNumber(userInfo.phoneNumber ?? "");
    setPhone(formattedPhone);
  }, [userInfo]);

  const {
    data: umbrellaData,
    isLoading: umbrellaDataLoading,
    error: getUmbrellaErrorMsg,
  } = useGetReturnUmbrella();

  const {
    data: formLockData,
    isLoading: returnFormLockLoading,
    error: getReturnFormLockErrorMsg,
  } = useGetReturnFormLockData(returnStoreId, salt, signature);

  const {
    data: formData,
    isLoading: returnFormLoading,
    error: getReturnFormErrorMsg,
  } = useGetReturnFormData(returnStoreId);

  const { mutate: updateRent } = useMutation(patchReturn);

  useEffect(() => {
    if (formData) {
      setClassificationName(formData.classificationName);
      setRentStoreName(formData.rentStoreName);
    }
  }, [formData]);

  useEffect(() => {
    if (formLockData) {
      setClassificationName(formLockData.classificationName);
      setRentStoreName(formLockData.rentStoreName);
    }
  }, [formLockData]);

  useEffect(() => {
    if (umbrellaData) {
      setUmbrellaUuid(umbrellaData.uuid);
      setElapsedDay(umbrellaData.elapsedDay);
    }
  }, [umbrellaData]);

  useEffect(() => {
    if (bank !== "" && accountNumber && accountNumber.length !== 0) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [bank, accountNumber]);

  if (umbrellaDataLoading || returnFormLockLoading || returnFormLoading) {
    return <></>;
  }

  if (getUmbrellaErrorMsg) {
    const error = getUmbrellaErrorMsg as TCustomError;
    const errorMsg = getErrorMessage(error);

    return (
      <div>
        <ErrorComponent error={t("common.error.pageNotFound")} subError={errorMsg} />
      </div>
    );
  }

  if (getReturnFormLockErrorMsg && salt && signature) {
    const error = getReturnFormLockErrorMsg as TCustomError;
    const errorMsg = getErrorMessage(error);

    return (
      <div>
        <ErrorComponent error={t("common.error.pageNotFound")} subError={errorMsg} />
      </div>
    );
  }

  if (getReturnFormErrorMsg) {
    const error = getReturnFormErrorMsg as TCustomError;
    const errorMsg = getErrorMessage(error);

    return (
      <div>
        <ErrorComponent error={t("common.error.pageNotFound")} subError={errorMsg} />
      </div>
    );
  }

  const onClickPatchBtn = () => {
    updateRent(
      {
        returnStoreId,
        bank,
        accountNumber,
        improvementReportContent,
      },
      {
        onError: (err) => {
          const error = err as TCustomError;
          const errorMsg = getErrorMessage(error);
          setSubError(errorMsg);
          return;
        },
        onSuccess: () => {
          setIsReturn(true);
          toast.success(t("toast.success.returnComplete"));
          return;
        },
      }
    );
  };

  return (
    <>
      {subError ? (
        <ErrorComponent error={t("common.error.pageNotFound")} subError={subError} />
      ) : (
        <>
          <HeaderContainer />
          <div className="flex-col max-w-2xl px-20 mx-auto pb-50">
            <div className="mt-20 mb-32 font-semibold text-black text-24 leading-32">
              {!isReturn ? t("return.form.titleBefore") : t("return.form.titleAfter")}
            </div>
            <div className="max-w-2xl p-16 mt-16 mb-32 border border-gray-200 rounded-12">
              <ul className="ml-16 list-disc text-8">
                <li className="text-14 leading-20 gray-700">{t("return.form.privacyNotice")}</li>
                <li className="text-14 leading-20 gray-700">
                  {t("return.form.accurateInfo1")}{" "}
                  <span className="inline text-red">{t("return.form.accurateInfo2")}</span>
                </li>
              </ul>
            </div>

            <FormBasic label={t("return.form.name")} value={name} />
            <FormBasic label={t("return.form.phone")} value={phone} />
            <FormLocationMolecules region={classificationName} storeName={rentStoreName} />
            <FormBasic label={t("return.form.umbrellaNo")} value={umbrellaUuid} />

            <div className="flex flex-col mb-32">
              <div className="mb-8 text-gray-700 text-15 leading-22">
                {t("return.form.refundAccount")}
              </div>
              <div className="flex justify-between w-full">
                {isReturn ? (
                  <div className="relative flex items-center p-12 text-gray-500 bg-gray-100 w-120 rounded-8 text-15 leading-22">
                    <div className="cursor-pointer w-120 text-15 leading-22 focus:outline-none">
                      {bank}
                    </div>
                    <ExpandMoreIcon
                      style={{
                        position: "absolute",
                        right: "3",
                        fontSize: "20px",
                        color: "#999999",
                      }}
                    />
                  </div>
                ) : (
                  <div
                    className={`relative w-120 flex items-center rounded-8 p-12 border border-gray-300 bg-white ${
                      bank !== t("return.form.bankName") ? "text-gray-700" : "text-gray-500"
                    }`}
                    onClick={() => setIsBottomSheetOpen(true)}
                  >
                    <div className="cursor-pointer w-120 text-15 leading-22 focus:outline-none">
                      {bank}
                    </div>
                    <ExpandMoreIcon
                      style={{
                        position: "absolute",
                        right: "3",
                        fontSize: "20px",
                        color: "#1C1B1F",
                      }}
                    />
                    <BottomSheet
                      isBottomSheetOpen={isBottomSheetOpen}
                      setIsBottomSheetOpen={setIsBottomSheetOpen}
                      snapPoints={[484, 272, 0]}
                    >
                      <BankContent setBank={setBank} setIsBottomSheetOpen={setIsBottomSheetOpen} />
                    </BottomSheet>
                  </div>
                )}
                {isReturn ? (
                  <div className="w-full p-12 ml-4 text-gray-500 bg-gray-100 rounded-8 text-15 leading-22">
                    {accountNumber}
                  </div>
                ) : (
                  <input
                    className={`ml-4 w-full rounded-8 p-12 focus:border-gray-600 focus:outline-none border border-gray-300`}
                    placeholder={accountNumber ? accountNumber : t("return.form.accountNumber")}
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                  />
                )}
              </div>
              <div className="mt-4 text-gray-600 text-14 leading-20">
                {t("return.form.accountHint1")} <br /> {t("return.form.accountHint2")} <br />{" "}
                {t("return.form.accountHint3")}
              </div>
            </div>

            <FormStatus
              label={t("return.form.improvement")}
              placeholder={t("return.form.improvementPlaceholder", { maxCharLimit })}
              setStatus={setImprovementReportContent}
              status={improvementReportContent}
              isComplete={isReturn}
              maxCharLimit={maxCharLimit}
            />

            {!isReturn && (
              <FormButton
                label={t("return.form.submit")}
                isActive={isActive}
                handleOpen={() => setIsOpenModal(true)}
              />
            )}

            {isOpenModal && (
              <FormModal height="380">
                <ReturnModal
                  classificationName={classificationName}
                  rentStoreName={rentStoreName}
                  umbrellaUuid={umbrellaUuid}
                  elapsedDay={elapsedDay}
                  bank={bank}
                  accountNumber={accountNumber}
                  setIsOpenModal={setIsOpenModal}
                  onClickPatchBtn={onClickPatchBtn}
                />
              </FormModal>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ReturnPage;
