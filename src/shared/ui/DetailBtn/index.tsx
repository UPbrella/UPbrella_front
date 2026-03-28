import { LAYOUT_ROUTES_URL } from "@/app/router/routes";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export type TDetailBtn = {
  id: number;
};

const DetailBtn = ({ id }: TDetailBtn) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleDetailClick = () => {
    navigate(LAYOUT_ROUTES_URL.rentalOfficeDetail.path(`${id}`));
  };
  return (
    <button
      className="w-full font-semibold text-center border text-primary-500 rounded-99 py-9 text-15 border-primary-500"
      onClick={handleDetailClick}
    >
      <StorefrontOutlinedIcon className="mr-2" />
      {t("store.detail.title")}
    </button>
  );
};

export default DetailBtn;
