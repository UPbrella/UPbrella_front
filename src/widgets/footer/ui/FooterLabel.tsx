import { BASIC_ROUTES_URL } from "@/app/router/routes";
import { LAYOUT_ROUTES_URL } from "@/app/router/routes";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const FooterLabel = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="flex gap-6 text-sm text-gray-700">
      <button
        onClick={() => {
          navigate(LAYOUT_ROUTES_URL.infoTos.path());
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        {t("common.footer.tos")}
      </button>
      <button
        onClick={() => {
          navigate(LAYOUT_ROUTES_URL.infoPp.path());
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        {t("common.footer.privacy")}
      </button>
      <button
        className="font-semibold"
        onClick={() => {
          navigate(BASIC_ROUTES_URL.contact.path());
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        CONTACT_US
      </button>
    </div>
  );
};
export default FooterLabel;
