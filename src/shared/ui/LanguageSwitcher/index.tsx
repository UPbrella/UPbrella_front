import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const isKo = i18n.language === "ko";

  const switchLang = (lang: "ko" | "en") => {
    i18n.changeLanguage(lang);
    localStorage.setItem("upbrella-lang", lang);
  };

  return (
    <div className="flex gap-2 items-center font-semibold text-14">
      <ToggleButton onClick={() => switchLang("ko")} isActive={isKo}>
        KOR
      </ToggleButton>
      <div className="w-px h-12 min-w-[1px] bg-gray-300" />
      <ToggleButton onClick={() => switchLang("en")} isActive={!isKo}>
        ENG
      </ToggleButton>
    </div>
  );
};

const ToggleButton = ({
  onClick,
  children,
  isActive,
}: {
  onClick: () => void;
  children: React.ReactNode;
  isActive: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      className={`grid place-items-center leading-none ${
        isActive ? "font-bold" : "font-medium text-gray-600"
      }`}
    >
      {children}
    </button>
  );
};

export default LanguageSwitcher;
