import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import MyLocationOutlinedIcon from "@mui/icons-material/MyLocationOutlined";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { getUserPosition } from "@/widgets/naver-map/lib/mapHelper";
import { useNavigate } from "react-router-dom";
import { BASIC_ROUTES_URL } from "@/app/router/routes";

const mapIconConfigs = [
  { icon: <MyLocationOutlinedIcon />, titleKey: "store.map.searchCurrent" as const },
  { icon: <RestartAltIcon />, titleKey: "store.map.refreshInfo" as const },
  { icon: <QuestionMarkIcon />, titleKey: "store.map.viewGuide" as const },
];

type MapBtnProps = {
  map: naver.maps.Map | undefined;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

const MapBtn = ({ map, setIsLoading }: MapBtnProps) => {
  const { t } = useTranslation();
  const { naver } = window;
  const navigate = useNavigate();

  const handleIconClick = async (index: number) => {
    // 각 버튼에 대한 클릭 동작 정의
    switch (index) {
      case 0:
        // 사용자의 현재 위치를 가져오는 함수 호출
        try {
          setIsLoading(true);
          const position = await getUserPosition();
          map?.setCenter(
            new naver.maps.LatLng(position.coords.latitude, position.coords.longitude)
          );
          new naver.maps.Marker({
            position: new naver.maps.LatLng(position.coords.latitude, position.coords.longitude),
            map: map,
            icon: {
              url: "https://navermaps.github.io/maps.js.ncp/docs/img/example/ico_pin.jpg",
              size: new naver.maps.Size(32, 40),
              scaledSize: new naver.maps.Size(25, 34),
              origin: new naver.maps.Point(0, 0),
              anchor: new naver.maps.Point(12, 35),
            },
          });
        } finally {
          setIsLoading(false);
        }
        break;
      case 1:
        window.location.reload();
        break;
      case 2:
        navigate(BASIC_ROUTES_URL.information.path());
        break;
      default:
        break;
    }
  };
  return (
    <div className="flex flex-col gap-2">
      {mapIconConfigs.map(({ icon, titleKey }, index) => (
        <div
          key={index + "key"}
          title={t(titleKey)}
          className="grid bg-white border border-gray-300 w-44 h-44 rounded-99 text-28 place-content-center hover:cursor-pointer"
          onClick={() => handleIconClick(index)}
        >
          {icon}
        </div>
      ))}
    </div>
  );
};

export default MapBtn;
