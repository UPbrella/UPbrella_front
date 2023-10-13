import { getUserPosition } from "@/utils/map/mapHelper";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";

export type TNaverDirectionBtn = {
  mobile?: boolean;
  slon?: number;
  slat?: number;
  elon: number;
  elat: number;
  address: string;
};

const NaverDirectionBtn = ({ elon, elat, address, mobile }: TNaverDirectionBtn) => {
  const handleDirectToNaver = async () => {
    try {
      const position = await getUserPosition(); // getCurrentPosition 함수는 실제 구현에 맞게 수정해야 합니다.
      const { latitude, longitude } = position.coords;

      // 도착지 주소를 URL 인코딩
      const encodedAddress = encodeURIComponent(address);

      if (mobile) {
        const naverMapAppUrl = `nmap://route/walk?slat=${latitude}&slng=${longitude}&sname=현재위치&dlat=${elat}&dlng=${elon}&dname=${encodedAddress}&appname=com.example.myapp`;
        window.location.href = naverMapAppUrl;
      } else {
        const naverMapURL = `http://map.naver.com/index.nhn?slng=${longitude}&slat=${latitude}&stext=현재위치&elng=${elon}&elat=${elat}&etext=${encodedAddress}&menu=route&pathType=1`;
        window.location.href = naverMapURL;
      }
    } catch (error) {
      // console.error("Error getting user position:", error);
    }
  };

  return (
    <div className="flex items-center">
      <button
        className="text-primary-500 bg-primary-200 rounded-99 w-full py-9 text-15 font-semibold justify-items-center"
        onClick={handleDirectToNaver}
      >
        <NearMeOutlinedIcon className="mr-2"></NearMeOutlinedIcon>네이버 길찾기
      </button>
    </div>
  );
};

export default NaverDirectionBtn;
