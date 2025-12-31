import { ChangeEvent, MouseEvent } from "react";

export type TInputs = {
  name: string;
  phoneNumber: string;
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
  bank: string;
  accountNumber: string;
  handleBackClick?: () => void;
  onChangeValue: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickBankArrow: () => void;
  onClickButton?: () => void;
  isOpenModal: boolean;
  isBottomSheetOpen: boolean;
  setIsBottomSheetOpen: (value: boolean) => void;
  setBank: (value: string) => void;
  handleClose: () => void;
  handleClickBank: (event: MouseEvent<HTMLDivElement>) => void;
  bankRef: React.RefObject<HTMLInputElement>;
};

export type SignUpRequiredFormProps = {
  name: string;
  namePlaceholder?: string;
  onChangeValue: (e: ChangeEvent<HTMLInputElement>) => void;
  phoneNumber: string;
  isNameValid: boolean;
  nameValidationMessage?: string;
  isPhoneNumberValid: boolean;
  isAllAllow?: boolean;
  onClickAllAllow: () => void;
  isFirstAllow?: boolean;
  onClickFirstAllow: () => void;
  onClickSecondAllow: () => void;
  isSecondAllow?: boolean;
  isDone?: boolean;
  onClickButton?: () => void;
  onClickDetailTOSPage: () => void;
  onClickDetailPPPage: () => void;
};
