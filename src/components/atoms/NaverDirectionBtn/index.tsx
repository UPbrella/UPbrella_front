import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";

const NaverDirectionBtn = () => {
  return (
    <div className="flex items-center">
      <button className="text-primary-500 bg-primary-200 rounded-99 w-360 h-40 text-15 font-semibold	justify-items-center	">
        <NearMeOutlinedIcon className="mr-2"></NearMeOutlinedIcon>네이버 길찾기
      </button>
    </div>
  );
};
export default NaverDirectionBtn;
