import i18n from "@/shared/lib/i18n";

export const DAY_OF_WEEK = {
  MONDAY: i18n.t("constants.day.monday"),
  TUESDAY: i18n.t("constants.day.tuesday"),
  WEDNESDAY: i18n.t("constants.day.wednesday"),
  THURSDAY: i18n.t("constants.day.thursday"),
  FRIDAY: i18n.t("constants.day.friday"),
  SATURDAY: i18n.t("constants.day.saturday"),
  SUNDAY: i18n.t("constants.day.sunday"),
} as const;
