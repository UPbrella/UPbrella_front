import {
  useGetClassifications,
  useGetClassificationsStore,
  useGetStoreDetail,
} from "@/entities/store/api/store.queries";
import { TClassification } from "@/entities/store/model/types";
import Card from "@/entities/store/ui/Card";
import MobileCard from "@/entities/store/ui/MobileCard";
import { useStoreSelection } from "@/pages/rental-location/lib/useStoreSelection";
import ClassificationsButtons from "@/pages/rental-location/ui/ClassificationsButtons";
import { DEFAULT_COORDINATE } from "@/shared/constants/map";
import { useUserGeolocation } from "@/shared/hooks/useUserGeolocation";
import BottomSheet from "@/shared/ui/BottomSheet";
import SeoMetaTag from "@/shared/ui/SeoMetaTag";
import { useMapMarkers } from "@/widgets/naver-map/lib/useMapMarkers";
import { useNaverMap } from "@/widgets/naver-map/lib/useNaverMap";
import "@/widgets/naver-map/styles/clusterMarker.css";
import "@/widgets/naver-map/styles/markerLabel.css";
import Map from "@/widgets/naver-map/ui/Map";
import MapBtn from "@/widgets/naver-map/ui/MapBtn";
import { CircularProgress } from "@mui/material";
import { useCallback, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

// 대여소 위치 페이지 — 커스텀 훅으로 로직을 분리하여 조합만 담당
const RentalLocationPage = () => {
  const { t } = useTranslation();
  const mapElement = useRef<HTMLDivElement | null>(null);
  const mapWidth = mapElement.current?.offsetWidth ?? null;

  // UI 상태
  const [selectedClassification, setSelectedClassification] = useState<TClassification>();
  const [isBottomOpen, setIsBottomOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 서버 데이터: 대분류 목록 조회
  const { data: classificationsRes } = useGetClassifications();
  // 사용자가 선택한 대분류, 없으면 첫 번째 대분류를 기본값으로 사용
  const effectiveClassification = selectedClassification ?? classificationsRes?.[0];

  // 선택된 대분류의 협업지점 목록 조회
  const { data: storeListRes, isFetching } = useGetClassificationsStore(
    effectiveClassification?.id ?? 0
  );

  // 활성화된(openStatus) 매장만 필터링
  const activeStores = useMemo(
    () => storeListRes?.filter((store) => store.openStatus) ?? [],
    [storeListRes]
  );

  // 대분류의 위경도를 지도 중심 좌표로 변환
  const center = useMemo(
    () => ({
      lat: effectiveClassification?.latitude ?? DEFAULT_COORDINATE.lat,
      lng: effectiveClassification?.longitude ?? DEFAULT_COORDINATE.lng,
    }),
    [effectiveClassification?.latitude, effectiveClassification?.longitude]
  );

  // 커스텀 훅: 네이버 맵 생성 + 중심 이동
  const { map } = useNaverMap(mapElement, center);
  // 커스텀 훅: 유저 현재 위치 조회
  const { position: userPosition } = useUserGeolocation();
  // 커스텀 훅: 매장 자동 선택 (가까운 순 or 랜덤)
  const { selectedStoreId, setSelectedStoreId } = useStoreSelection(activeStores, userPosition);
  // 선택된 매장 상세 조회
  const { data: storeDetail } = useGetStoreDetail(selectedStoreId ?? 0);

  // 마커 클릭 시: 매장 선택 + 바텀시트 열기
  const handleStoreSelect = useCallback(
    (storeId: number) => {
      setSelectedStoreId(storeId);
      setIsBottomOpen(true);
    },
    [setSelectedStoreId]
  );

  // 커스텀 훅: 클러스터/마커 생성·제거·이벤트 일괄 관리
  useMapMarkers(map, activeStores, selectedStoreId, handleStoreSelect);

  return (
    <>
      <SeoMetaTag
        title={t("seo.rentalLocation.title")}
        description={t("seo.rentalLocation.desc")}
        keywords={t("seo.rentalLocation.keywords")}
      />

      <div className="flex flex-col flex-1 pb-20">
        <div className="flex justify-center gap-[24px] flex-1">
          <div className="min-w-[400px] max-w-[400px] hidden xl:block">
            {storeDetail && <Card storeDetail={storeDetail} />}
          </div>

          <div className="flex relative flex-1 justify-center rounded-20 max-w-640 xl:max-w-full">
            {(isFetching || isLoading) && (
              <div className="absolute w-full h-full z-[101] bg-gray-50 bg-opacity-40 flex justify-center items-center">
                <CircularProgress
                  size={70}
                  sx={{
                    color: "#E86F52",
                  }}
                />
              </div>
            )}

            <Map ref={mapElement} width="100%" height="100%" borderRadius="20px" />
            <div className="absolute top-0 left-0 p-24 pr-60 w-full z-9">
              {classificationsRes && (
                <ClassificationsButtons
                  classificationsRes={classificationsRes}
                  selectedClassification={effectiveClassification}
                  setSelectedClassification={setSelectedClassification}
                />
              )}
            </div>
            <div className="absolute top-0 right-7 z-10 pt-86">
              <MapBtn map={map} setIsLoading={setIsLoading} />
            </div>
            {isBottomOpen && mapWidth && storeDetail && (
              <BottomSheet
                isBottomSheetOpen={isBottomOpen}
                setIsBottomSheetOpen={setIsBottomOpen}
                snapPoints={[295, 295, 0]}
                _className="hidden lg:block"
              >
                <MobileCard storeDetail={storeDetail} />
              </BottomSheet>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RentalLocationPage;
