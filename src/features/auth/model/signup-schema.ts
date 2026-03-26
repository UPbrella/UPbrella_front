import { isValidPhoneNumber, PHONE_NUMBER_ERROR_MESSAGE } from "@/shared/lib/utils";
import { z } from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .min(2, "최소 2자 이상 입력해주세요.")
    .max(20, "최대 20자까지 입력 가능합니다.")
    .regex(/^[가-힣a-zA-Z\s]+$/, "국문, 영문만 입력 가능합니다."),
  phoneNumber: z
    .string()
    .refine((val) => isValidPhoneNumber(val), PHONE_NUMBER_ERROR_MESSAGE)
    .optional()
    .or(z.literal("")),
  email: z.string().optional(),
  bank: z.string().optional(),
  accountNumber: z.string().optional(),
  termsOfService: z.boolean().refine((val) => val === true, "필수 동의 항목입니다."),
  privacyPolicy: z.boolean().refine((val) => val === true, "필수 동의 항목입니다."),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
