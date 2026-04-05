import React from "react";
import { useTranslation } from "react-i18next";

const Instagram = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-314 w-full h-184 flex flex-col justify-between items-start py-24 px-20 border border-gray-200 rounded-12 bg-white lg:px-20 sm:px-0">
      <div className="text-16 leading-24 text-gray-700">
        {t("contact.instagramDesc1")}
        <br />
        {t("contact.instagramDesc2")}
      </div>
      <a
        className=" bg-primary-200 rounded-8 px-20 py-12 font-semibold text-16 leading-24 text-primary-500"
        href="https://www.instagram.com/direct/t/17846148278607764"
      >
        {t("contact.instagramBtn")}
      </a>
    </div>
  );
};

export default Instagram;
