import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type ko from "@/shared/lib/i18n/locales/ko.json";
import { ADMIN_ROUTES } from "@/app/router/routes";
import { Tab, Tabs } from "@mui/material";
import { BASIC_ROUTES_URL } from "@/app/router/routes";

const AdminMenu = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const idx = ADMIN_ROUTES.findIndex((e) => e.path() === location.pathname);

  if (idx === -1) {
    navigate(BASIC_ROUTES_URL.root.path());
    alert(t("admin.menu.wrongPath"));
  }

  const [value, setValue] = useState(idx);

  const handleChange = (newValue: number) => {
    setValue(newValue);
    navigate(ADMIN_ROUTES[newValue].path());
    return;
  };

  useEffect(() => {
    setValue(idx);
  }, [idx]);

  return (
    <>
      <Tabs
        variant="scrollable"
        className="mt-16"
        value={value}
        onChange={(_, value) => handleChange(value)}
      >
        {ADMIN_ROUTES.map(({ name }) => (
          <Tab key={name} label={t(name as keyof typeof ko)} />
        ))}
      </Tabs>
    </>
  );
};

export default AdminMenu;
