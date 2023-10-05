import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import { useNavigate } from "react-router-dom";

export type TDetailBtn = {
  id: number;
};

const DetailBtn = ({ id }: TDetailBtn) => {
  const navigate = useNavigate();
  const handleDetailClick = () => {
    navigate(`/rentalOffice/${id}`);
  };
  return (
    <button
      className="text-center text-primary-500 rounded-99 w-full py-9 text-15 font-semibold border border-primary-500"
      onClick={handleDetailClick}
    >
      <StorefrontOutlinedIcon className="mr-2" />
      소개 더보기
    </button>
  );
};

export default DetailBtn;
