import i18n from "@/shared/lib/i18n";
import { isValidPhoneNumber } from "@/shared/lib/utils";
import { z } from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .min(2, i18n.t("auth.validation.nameMin"))
    .max(20, i18n.t("auth.validation.nameMax"))
    .regex(/^[가-힣a-zA-Z\s]+$/, i18n.t("auth.validation.nameFormat")),
  phoneNumber: z
    .string()
    .refine((val) => isValidPhoneNumber(val), i18n.t("auth.validation.phoneFormat"))
    .optional()
    .or(z.literal("")),
  email: z.string().optional(),
  bank: z.string().optional(),
  accountNumber: z.string().optional(),
  termsOfService: z
    .boolean()
    .refine((val) => val === true, i18n.t("auth.validation.termsRequired")),
  privacyPolicy: z.boolean().refine((val) => val === true, i18n.t("auth.validation.termsRequired")),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
