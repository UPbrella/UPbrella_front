import { postRent } from "@/features/rent-form/api/form-api";
import FormBasic from "@/features/rent-form/ui/FormBasic";
import FormButton from "@/features/rent-form/ui/FormButton";
import FormStatus from "@/features/rent-form/ui/FormStatus";
import RentDeposit from "@/features/rent-form/ui/RentDeposit";
import RentModalAccount from "@/features/rent-form/ui/RentModalAccount";
import RentModalFinish from "@/features/rent-form/ui/RentModalFinish";
import RentModalStorageIssue from "@/features/rent-form/ui/RentModalStorageIssue";
import SignUpFormInput from "@/features/auth/ui/SignUpFormInput";
import SignUpFormInputTitle from "@/features/auth/ui/SignUpFormInputTitle";
import ErrorComponent from "@/shared/ui/ErrorComponent";
import FormLocationMolecules from "@/features/rent-form/ui/FormLocationMolecules";
import FormModal from "@/features/rent-form/ui/FormModal";
import { HeaderContainer } from "@/widgets/header/ui/HeaderContainer";
import { useGetRentFormData, useGetReturnUmbrella } from "@/features/rent-form/api/form.queries";
import { loginInfo, redirectUrl } from "@/features/auth";
import { TCustomError } from "@/shared/model/types";
import { getErrorMessage } from "@/shared/api/error";
import { formatPhoneNumber, getPhoneNumberError, isValidPhoneNumber } from "@/shared/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useTranslation } from "react-i18next";

const RentPage = () => {
  const { t } = useTranslation();
  // 대여 전(false), 대여 후(true)
  const [isRent, setIsRent] = useState(false);
  const { id } = useParams();
  const umbrellaId = id ? parseInt(id, 10) : 0;

  const userInfo = useRecoilValue(loginInfo);

  // 대여폼
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [region, setRegion] = useState("");
  const [storeName, setStoreName] = useState("");
  const [umbrellaUuid, setUmbrellaUuid] = useState(0);
  const [conditionReport, setConditionReport] = useState("");
  const [storeId, setStoreId] = useState(0);
  const [lockNumber, setLockNumber] = useState("");
  const [isOpenDepositModal, setIsOpenDepositModal] = useState(false);
  const [isOpenLockPwModal, setIsOpenLockPwModal] = useState(false);
  const [isOpenStorageIssue, setIsOpenStorageIssue] = useState(false);
  const maxCharLimit = 400;

  // 에러메시지
  const [subError, setSubError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  // hook
  const { data, isError, isLoading: rentFormDataLoading } = useGetRentFormData(umbrellaId);
  const { data: umbrellaData, isLoading: umbrellaDataLoading } = useGetReturnUmbrella();
  const { mutate: createMutate } = useMutation(postRent);

  const setRedirectUrl = useSetRecoilState(redirectUrl);

  useEffect(() => {
    setRedirectUrl("/");
  }, [setRedirectUrl]);

  useEffect(() => {
    setName(userInfo.name);
    if (userInfo.phoneNumber) {
      const formattedPhone = formatPhoneNumber(userInfo.phoneNumber);
      setPhone(formattedPhone);
    }
  }, [userInfo]);

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
    setPhoneError(getPhoneNumberError(formatted));
  };

  useEffect(() => {
    if (data) {
      setRegion(data.classificationName);
      setStoreName(data.rentStoreName);
      setUmbrellaUuid(data.umbrellaUuid);
      setStoreId(data.storeMetaId);
    }
  }, [data]);

  if (rentFormDataLoading || umbrellaDataLoading) {
    return <></>;
  }

  if (umbrellaData) {
    return (
      <div>
        <ErrorComponent
          error={t("common.error.pageNotFound")}
          subError={t("rent.error.alreadyRented")}
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <ErrorComponent
          error={t("common.error.pageNotFound")}
          subError={t("rent.error.unavailable")}
        />
      </div>
    );
  }

  const onClickPostBtn = () => {
    const phoneNumber = phone.trim();

    createMutate(
      { region, storeId, umbrellaId, phoneNumber, conditionReport },
      {
        onError: (err) => {
          const error = err as TCustomError;
          const errorMsg = getErrorMessage(error);
          setSubError(errorMsg);
          return;
        },
        onSuccess: ({ data }) => {
          setIsOpenDepositModal(false);

          if (data) {
            setLockNumber(data.password.toString());
            setIsOpenLockPwModal(true);
          } else {
            setIsRent(true);
            toast.success(t("toast.success.rentComplete"));
          }
        },
      }
    );
  };

  const handleOpenDepositModal = () => {
    setIsOpenDepositModal(true);
  };

  const handleCloseDepositModal = () => setIsOpenDepositModal(false);

  const handleCloseLockPwModal = () => setIsOpenLockPwModal(false);

  return (
    <>
      {subError ? (
        <ErrorComponent error={t("common.error.pageNotFound")} subError={subError} />
      ) : (
        <>
          <HeaderContainer />
          <div className="flex-col px-20 mx-auto max-w-2xl pb-50">
            <div className="mt-20 font-semibold text-black text-24 leading-32">
              {isRent ? t("rent.form.titleAfter") : t("rent.form.titleBefore")}
            </div>
            <div className="p-16 mt-16 mb-32 max-w-2xl border border-gray-200 rounded-12">
              <ul className="ml-16 list-disc text-8">
                <li className="text-14 leading-20 gray-700">{t("rent.form.privacyNotice")}</li>
                <li className="text-14 leading-20 gray-700">{t("rent.form.anywhereReturn")}</li>
              </ul>
            </div>
            <FormBasic label={t("rent.form.name")} value={name} />

            <section className="mb-32">
              <div className="mb-8">
                <SignUpFormInputTitle
                  label={t("rent.form.phone")}
                  isRequired={isRent ? false : true}
                />
              </div>
              {isRent ? (
                <FormBasic label={t("rent.form.phone")} value={phone} />
              ) : (
                <SignUpFormInput
                  label="010-1234-5678"
                  name="phoneNumber"
                  value={phone}
                  onChange={handlePhoneNumberChange}
                />
              )}
              {phoneError && (
                <div className="mt-4 text-red text-14 text-normal leading-20">{phoneError}</div>
              )}
            </section>
            <FormLocationMolecules region={region} storeName={storeName} />
            <FormBasic label={t("rent.form.umbrellaNo")} value={umbrellaUuid} />

            <RentDeposit />

            <FormStatus
              label={t("rent.form.conditionReport")}
              placeholder={t("rent.form.conditionPlaceholder", { maxCharLimit })}
              setStatus={setConditionReport}
              status={conditionReport}
              isComplete={isRent}
              maxCharLimit={maxCharLimit}
            />
            {!isRent && (
              <FormButton
                label={t("rent.form.submit")}
                isActive={phone.length === 13 && isValidPhoneNumber(phone)}
                handleOpen={handleOpenDepositModal}
              />
            )}

            {isOpenDepositModal && (
              <FormModal height="286">
                <RentModalAccount
                  handleCloseDepositModal={handleCloseDepositModal}
                  umbrellaUuid={umbrellaUuid}
                  region={region}
                  storeName={storeName}
                  umbrellaId={umbrellaId}
                  conditionReport={conditionReport}
                  storeId={storeId}
                  onClickPostBtn={onClickPostBtn}
                />
              </FormModal>
            )}

            {isOpenLockPwModal && (
              <FormModal height="266">
                <RentModalFinish
                  handleCloseLockPwModal={handleCloseLockPwModal}
                  lockNumber={lockNumber}
                  setIsOpenStorageIssue={setIsOpenStorageIssue}
                  setIsRent={setIsRent}
                />
              </FormModal>
            )}

            {isOpenStorageIssue && (
              <FormModal height="184">
                <RentModalStorageIssue
                  setIsOpenStorageIssue={setIsOpenStorageIssue}
                  setLockNumber={setLockNumber}
                  setIsOpenLockPwModal={setIsOpenLockPwModal}
                  storeId={storeId}
                />
              </FormModal>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default RentPage;
