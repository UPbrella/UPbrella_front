import { SignUpFormData } from "@/features/auth/model/signup-schema";
import { Control, FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";

export type TInputs = {
  name: string;
  phoneNumber?: string | null;
  email?: string;
  bank: string;
  accountNumber: string;
};

export type TSocialUserSession = {
  name: string | null;
  email: string | null;
  provider: string | null;
};

export type SignUpNotRequiredFormProps = {
  register: UseFormRegister<SignUpFormData>;
  watch: UseFormWatch<SignUpFormData>;
  handleBackClick?: () => void;
  onClickBankArrow: () => void;
  onClickButton?: () => void;
  isOpenModal: boolean;
  isBottomSheetOpen: boolean;
  setIsBottomSheetOpen: (value: boolean) => void;
  setBank: (value: string) => void;
  handleClose: () => void;
  bankRef: React.RefObject<HTMLInputElement>;
  onAccountNumberChange?: (value: string) => void;
};

export type SignUpRequiredFormProps = {
  register: UseFormRegister<SignUpFormData>;
  control: Control<SignUpFormData>;
  errors: FieldErrors<SignUpFormData>;
  watch: UseFormWatch<SignUpFormData>;
  isValid: boolean;
  onClickButton?: () => void;
  onClickDetailTOSPage: () => void;
  onClickDetailPPPage: () => void;
  onPhoneNumberChange?: (value: string) => void;
};
