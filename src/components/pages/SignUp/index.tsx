import SignUpNotRequiredForm from "@/components/templates/SignUp/SignUpNotRequired";
import SignUpRequiredForm from "@/components/templates/SignUp/SignUpRequired";
import { useGetSocialSession, useUpbrellaSignUp } from "@/hooks/queries/userQueries";
import { SignUpFormData, signUpSchema } from "@/schemas/signUpSchema";
import { TInputs } from "@/types/signup/SignupTypes";
import SeoMetaTag from "@/utils/SeoMetaTag";
import { formatPhoneNumber, validateNumber } from "@/utils/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

const SignUpPage = () => {
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

  // 소셜 로그인 세션에서 이름과 이메일 자동 채우기
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

  // 전화번호 포맷팅 핸들러
  const handlePhoneNumberChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    setValue("phoneNumber", formatted, { shouldValidate: true });
  };

  // 계좌번호 숫자만 입력 핸들러
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
      phoneNumber: data.phoneNumber?.trim() || undefined,
      email: data.email,
      bank: data.bank || "",
      accountNumber: data.accountNumber || "",
    };

    signUpMutate(submitData);
  };

  return (
    <>
      <SeoMetaTag
        title={"회원가입"}
        description={"업브렐라 서비스 이용을 위한 회원가입 페이지입니다."}
        keywords={", 회원가입, sign up"}
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
