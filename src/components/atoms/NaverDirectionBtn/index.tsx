import { getUserPosition } from "@/utils/map/mapHelper";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import { ProgressSpinner } from "primereact/progressspinner";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";

export type TNaverDirectionBtn = {
  elon: number;
  elat: number;
  address: string;
};

const NaverDirectionBtn = ({ elon, elat, address }: TNaverDirectionBtn) => {
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    (async () => {
      const encodedAddress = encodeURIComponent(address);
      let naverMapURL = "";

      try {
        const position = await getUserPosition();
        const { latitude, longitude } = position.coords;
        if (isMobile) {
          naverMapURL = `nmap://route/walk?slat=${latitude}&slng=${longitude}&sname=현재위치&dlat=${elat}&dlng=${elon}&dname=${encodedAddress}&appname=com.example.myapp`;
        } else {
          naverMapURL = `http://map.naver.com/index.nhn?slng=${longitude}&slat=${latitude}&stext=현재위치&elng=${elon}&elat=${elat}&etext=${encodedAddress}&menu=route&pathType=1`;
        }
      } catch (error) {
        if (isMobile) {
          naverMapURL = `nmap://route/walk?dlat=${elat}&dlng=${elon}&dname=${encodedAddress}&appname=com.example.myapp`;
        } else {
          naverMapURL = `http://map.naver.com/index.nhn?elng=${elon}&elat=${elat}&etext=${encodedAddress}&menu=route&pathType=1`;
        }
      } finally {
        setUrl(naverMapURL);
      }
    })();
  }, [address, elat, elon]);

  return (
    <div className="flex items-center">
      <a
        target="_blank"
        rel="noreferrer"
        className="flex gap-[4px] items-center justify-center w-full font-semibold transition-all hover:bg-primary-400 text-primary-500 bg-primary-200 rounded-99 py-9 text-15"
        href={url}
        style={
          !url
            ? {
                pointerEvents: "none",
                opacity: 0.8,
              }
            : {}
        }
      >
        <NearMeOutlinedIcon />
        네이버 길찾기
        {!url && (
          <ProgressSpinner
            style={{ width: "20px", height: "auto", margin: 0 }}
            strokeWidth="5"
            animationDuration="1s"
          />
        )}
      </a>
    </div>
  );
};

export default NaverDirectionBtn;
