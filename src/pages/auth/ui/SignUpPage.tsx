import SignUpNotRequiredForm from "@/features/auth/ui/SignUpNotRequired";
import SignUpRequiredForm from "@/features/auth/ui/SignUpRequired";
import { useGetSocialSession, useUpbrellaSignUp } from "@/entities/user/api/user.queries";
import { SignUpFormData, signUpSchema } from "@/features/auth/model/signup-schema";
import { TInputs } from "@/features/auth/model/signup-types";
import SeoMetaTag from "@/shared/ui/SeoMetaTag";
import { formatPhoneNumber, validateNumber } from "@/shared/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const SignUpPage = () => {
  const { t } = useTranslation();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      phoneNumber: "",
      email: "",
      bank: "",
      accountNumber: "",
      termsOfService: false,
      privacyPolicy: false,
    },
  });

  const { data: socialSession } = useGetSocialSession();
  const [isNext, setIsNext] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const bankInput = useRef<HTMLInputElement>(null);

  const { mutate: signUpMutate } = useUpbrellaSignUp();

  useEffect(() => {
    if (socialSession?.data?.data) {
      const { name: sessionName, email: sessionEmail } = socialSession.data.data;

      if (sessionName && sessionName.trim() !== "") {
        setValue("name", sessionName, { shouldValidate: true });
      }
      if (sessionEmail && sessionEmail.trim() !== "") {
        setValue("email", sessionEmail);
      }
    }
  }, [socialSession, setValue]);

  const handlePhoneNumberChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    setValue("phoneNumber", formatted, { shouldValidate: true });
  };

  const handleAccountNumberChange = (value: string) => {
    if (validateNumber(value)) {
      setValue("accountNumber", value, { shouldValidate: true });
    }
  };

  const onClickButton = () => {
    if (isValid) {
      setIsNext(true);
    }
  };

  const handleBackClick = () => {
    setIsNext(false);
  };

  const onClickBankArrow = () => {
    setIsOpenModal(!isOpenModal);
    setIsBottomSheetOpen(!isBottomSheetOpen);
  };

  const handleClickBank = (event: MouseEvent<HTMLDivElement>) => {
    const bankName = event.currentTarget.textContent;
    if (bankName) {
      setValue("bank", bankName);
      setIsOpenModal(false);
    }
  };

  const setBank = (value: string) => {
    setValue("bank", value);
  };

  const handleClose = () => {
    setIsOpenModal(!isOpenModal);
  };

  const onSubmit = (data: SignUpFormData) => {
    const submitData: TInputs = {
      name: data.name,
      phoneNumber: data.phoneNumber?.trim() || null,
      email: data.email,
      bank: data.bank || "",
      accountNumber: data.accountNumber || "",
    };

    signUpMutate(submitData);
  };

  return (
    <>
      <SeoMetaTag
        title={t("seo.signup.title")}
        description={t("seo.signup.desc")}
        keywords={t("seo.signup.keywords")}
      />
      {isNext ? (
        <SignUpNotRequiredForm
          register={register}
          watch={watch}
          handleBackClick={handleBackClick}
          onClickBankArrow={onClickBankArrow}
          isOpenModal={isOpenModal}
          isBottomSheetOpen={isBottomSheetOpen}
          setIsBottomSheetOpen={setIsBottomSheetOpen}
          setBank={setBank}
          handleClose={handleClose}
          handleClickBank={handleClickBank}
          onClickButton={handleSubmit(onSubmit)}
          bankRef={bankInput}
          onAccountNumberChange={handleAccountNumberChange}
        />
      ) : (
        <SignUpRequiredForm
          register={register}
          control={control}
          errors={errors}
          watch={watch}
          isValid={isValid}
          onClickButton={onClickButton}
          onClickDetailTOSPage={() => {
            const url = `${window.location.origin}/info/tos`;
            window.open(url, "_blank", "noopener, noreferrer");
          }}
          onClickDetailPPPage={() => {
            const url = `${window.location.origin}/info/pp`;
            window.open(url, "_blank", "noopener, noreferrer");
          }}
          onPhoneNumberChange={handlePhoneNumberChange}
        />
      )}
    </>
  );
};

export default SignUpPage;
