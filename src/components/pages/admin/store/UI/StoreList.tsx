import Stores from "@/mocks/Stores";
import CustomModal from "@/components/organisms/Modal";
import useModalStatus from "@/hooks/custom/useModalStatus";
import StoreTable from "@/components/organisms/admin/StoreTable";
import { Button } from "@mui/material";
import { StoreTableColumns, getStoreTableData } from "@/utils/admin/storeHelpers";
import { useState } from "react";
import { TStoreDetail } from "@/types/admin/StoreTypes";
import { storeInitializer } from "@/components/pages/admin/store/helper";
import ContentsTitle from "@/components/molecules/ContentsTitle";
import StoreModalBody from "@/components/pages/admin/store/UI/StoreModalBody";

// 그 외의 데이터가 더 있지만, type 지정은 일단 하지 않음.
type TKakaoAddressResult = {
  x: string;
  y: string;
};

const StoreList = () => {
  const { kakao } = window;

  const { isOpen, handleOpen, handleClose } = useModalStatus();

  const rows = getStoreTableData(Stores.StoreMockData);

  // modal store 데이터
  const [storeData, setStoreData] = useState<TStoreDetail>(storeInitializer());

  // 주소에 따라 위도, 경도 저장
  const getCoordinateByAddress = (address: string) => {
    kakao.maps.load(() => {
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(address, (result: TKakaoAddressResult[], status: string) => {
        if (status === kakao.maps.services.Status.OK) {
          // x: latitude, y: longitude

          setStoreData({
            ...storeData,
            address,
            latitude: result[0].x,
            longitude: result[0].y,
          });
        }
      });
    });
  };

  const onClickStoreRow = (id: number) => {
    const selectRow = rows.find((row) => row.id === id);
    if (!selectRow) {
      // error
      // store 정보없음
      return;
    }

    setStoreData(selectRow);
    handleOpen();
  };

  const onChangeStoreData = (e: { target: { name: string; value: string | number } }) => {
    const { name, value } = e.target;

    // 이미지

    // 주소
    if (name === "address") {
      getCoordinateByAddress(value as string);
      return;
    }

    // 그외
    setStoreData({
      ...storeData,
      [name]: value,
    });
  };

  // 추가인지 수정인지
  const isCreate = Boolean(!storeData?.id);

  return (
    <>
      <div className="flex flex-col gap-8">
        {/* 컨텐츠 헤더  */}
        <ContentsTitle title={"협업지점 목록"}>
          <Button
            variant="contained"
            onClick={() => {
              setStoreData(storeInitializer());
              handleOpen();
            }}
          >
            추가
          </Button>
        </ContentsTitle>

        {/* 협업 지점 테이블 */}
        <StoreTable columns={StoreTableColumns} rows={rows} onClickStoreRow={onClickStoreRow} />
      </div>

      <CustomModal
        isOpen={isOpen}
        handleClose={handleClose}
        titleText={`협업지점 ${isCreate ? "추가" : "수정"}`}
        footerContents={
          isCreate ? (
            <>
              <Button size="large" autoFocus onClick={handleClose}>
                추가
              </Button>
            </>
          ) : (
            <>
              <Button size="large" autoFocus onClick={handleClose}>
                수정
              </Button>
              <Button
                color="error"
                size="large"
                autoFocus
                onClick={() => {
                  if (window.confirm("정말 삭제하시겠습니까 ?")) {
                    //  삭제
                    handleClose();
                  }
                }}
              >
                삭제
              </Button>
            </>
          )
        }
      >
        <StoreModalBody storeData={storeData} onChangeStoreData={onChangeStoreData} />
      </CustomModal>
    </>
  );
};

export default StoreList;
