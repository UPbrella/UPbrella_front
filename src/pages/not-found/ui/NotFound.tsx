import { BASIC_ROUTES_URL } from "@/app/router/routes";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-20">
      <Typography variant="h5">{t("common.error.notFoundDesc")}</Typography>

      <Button
        variant="contained"
        className="!bg-primary-500"
        onClick={() => {
          navigate(BASIC_ROUTES_URL.root.path());
        }}
      >
        {t("common.error.goMain")}
      </Button>
    </div>
  );
};

export default NotFound;
