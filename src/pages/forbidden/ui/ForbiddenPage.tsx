import ErrorComponent from "@/shared/ui/ErrorComponent";
import { useTranslation } from "react-i18next";

const ForbiddenPage = () => {
  const { t } = useTranslation();

  return (
    <ErrorComponent error={t("common.error.pageNotFound")} subError={t("common.error.forbidden")} />
  );
};

export default ForbiddenPage;
