import { useTranslation } from "react-i18next";

type TButtonProps = {
  isActive: boolean;
};

const Button = ({ isActive }: TButtonProps) => {
  const { t } = useTranslation();

  return (
    <div>
      <button
        type="submit"
        className={`w-full h-48 bg-primary-500 rounded-8 text-white text-16 leading-24 font-semibold  ${
          isActive ? "" : "opacity-50 cursor-not-allowed"
        }`}
        disabled={!isActive}
      >
        {t("contact.submit")}
      </button>
    </div>
  );
};

export default Button;
