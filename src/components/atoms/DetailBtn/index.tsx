import { LAYOUT_ROUTES_URL } from "@/routes/layoutRouter";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import { useNavigate } from "react-router-dom";

export type TDetailBtn = {
  id: number;
};

const DetailBtn = ({ id }: TDetailBtn) => {
  const navigate = useNavigate();
  const handleDetailClick = () => {
    navigate(LAYOUT_ROUTES_URL.rentalOfficeDetail.path(`${id}`));
  };
  return (
    <button
      className="w-full font-semibold text-center border text-primary-500 rounded-99 py-9 text-15 border-primary-500"
      onClick={handleDetailClick}
    >
      <StorefrontOutlinedIcon className="mr-2" />
      소개 더보기
    </button>
  );
};

export default DetailBtn;
