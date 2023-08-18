import StoreFormWrapper from "@/components/pages/admin/store/UI/StoreFormWrapper";
import useModalStatus from "@/hooks/custom/useModalStatus";
import DaumPostcode from "react-daum-postcode";
import { TStoreBusinessHours, TStoreParams } from "@/types/admin/StoreTypes";
import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import SelectBox from "@/components/molecules/SelectBox";
import { useState } from "react";
import { createSelectItems } from "@/utils/selectBox";
import { DAY_OF_WEEK } from "@/constants/Date";
import { getFilterBusinessTime } from "@/components/pages/admin/store/helper";
import { TDayOfWeek } from "@/types/commonTypes";

type TProps = {
  storeData: TStoreParams;
  onChangeStoreData: (e: {
    target: { name: string; value: string | number | null | TStoreBusinessHours[] };
  }) => void;
};

const StoreModalContents = ({ storeData, onChangeStoreData }: TProps) => {
  const {
    isOpen: isOpenAddress,
    handleOpen: handleOpenAddress,
    handleClose: handleCloseAddress,
  } = useModalStatus();

  const [dayInputState, setDayInputState] = useState<TStoreBusinessHours>({
    date: "MONDAY",
    openAt: "11:00",
    closeAt: "20:00",
  });

  const onChangeDayInput = (name: string, value: string | number | null) => {
    if (name === "openAt" || name === "closeAt") {
      const _value = getFilterBusinessTime(dayInputState[name], value as string);
      if (_value === undefined) return;

      setDayInputState((prev) => ({
        ...prev,
        [name]: _value,
      }));
      return;
    }

    setDayInputState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onClickHourAdd = () => {
    const foundData = storeData.businessHours.find((e) => e.date === dayInputState.date);
    if (foundData) return;

    onChangeStoreData({
      target: { name: "businessHours", value: [...storeData.businessHours, dayInputState] },
    });
  };

  const onClickHourRemove = (date: TDayOfWeek) => {
    const filterData = storeData.businessHours.filter((e) => e.date !== date);

    onChangeStoreData({
      target: { name: "businessHours", value: filterData },
    });
  };

  /* 협업지점 관련 내용 입력 폼 */
  return (
    <div className="flex flex-col gap-4">
      {/* 협업 지점명 */}
      <StoreFormWrapper label="협업 지점명" isRequired>
        <TextField
          placeholder="업브렐라 1호점"
          value={storeData.name}
          name="name"
          onChange={onChangeStoreData}
        />
      </StoreFormWrapper>

      {/* 지점 분류 */}
      <StoreFormWrapper label="지점 분류" isRequired>
        <TextField
          placeholder="카페, 디저트"
          value={storeData.category}
          name="category"
          onChange={onChangeStoreData}
        />
      </StoreFormWrapper>

      {/* TODO: 위치 태그 api 로 받아와서 dropdown 선택 */}
      {/* 대여소 위치 내 지역 태그 */}
      <StoreFormWrapper label="대여소 위치 내 지역 태그" isRequired>
        <div>
          <SelectBox
            label="대분류" // 명칭 미정
            value={storeData.classificationId ?? ""}
            name="classificationId"
            onChange={(name, value) => onChangeStoreData({ target: { name, value } })}
            menuItems={[]}
          />
        </div>
      </StoreFormWrapper>

      {/* 협업지점 소개페이지 내 지역 태그 */}
      <StoreFormWrapper label="협업지점 소개페이지 내 지역 태그" isRequired>
        <div>
          <SelectBox
            label="소분류" // 명칭 미정
            value={storeData.subClassificationId ?? ""}
            name="subClassificationId"
            onChange={(name, value) => onChangeStoreData({ target: { name, value } })}
            menuItems={[]}
          />
        </div>
      </StoreFormWrapper>

      {/* 영업 시간 */}
      <StoreFormWrapper label="영업 시간" isRequired>
        <div>
          <div className="flex items-center gap-4 w-[600px]">
            <SelectBox
              label="요일"
              value={dayInputState.date}
              name="date"
              onChange={onChangeDayInput}
              menuItems={createSelectItems(DAY_OF_WEEK)}
            />
            {/* TODO: openAt < closeAt 검증 필요 */}
            <TextField
              placeholder="10:00"
              value={dayInputState.openAt}
              name="openAt"
              onChange={({ target: { name, value } }) => onChangeDayInput(name, value)}
            />
            ~
            <TextField
              placeholder="18:00"
              value={dayInputState.closeAt}
              name="closeAt"
              onChange={({ target: { name, value } }) => onChangeDayInput(name, value)}
            />
            <Button onClick={onClickHourAdd}>추가</Button>
          </div>
          <div className="mt-6">
            {storeData.businessHours.map(({ date, openAt, closeAt }) => {
              return (
                <Typography align="right" variant="subtitle1" key={date}>
                  {`${DAY_OF_WEEK[date]} ${openAt} ~ ${closeAt}`}{" "}
                  <Button color="error" onClick={() => onClickHourRemove(date)}>
                    X
                  </Button>
                </Typography>
              );
            })}
          </div>
        </div>
      </StoreFormWrapper>

      {/* 주소, 상세주소 */}
      <StoreFormWrapper label="주소" isRequired>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <TextField
              className="w-250"
              placeholder="주소 검색으로 입력해주세요."
              disabled
              value={storeData.address}
              name="address"
              onChange={onChangeStoreData}
            />
            <Button variant="contained" onClick={handleOpenAddress}>
              검색
            </Button>
          </div>
          {isOpenAddress && (
            <DaumPostcode
              onComplete={(res) => {
                // logic
                onChangeStoreData({
                  target: {
                    name: "address",
                    value: res.address,
                  },
                });
                handleCloseAddress();
              }}
              autoClose={false}
            ></DaumPostcode>
          )}
          {/* detail address 필요? */}
          <TextField
            placeholder="상세 주소를 입력해주세요."
            name="addressDetail"
            value={storeData.addressDetail}
            onChange={onChangeStoreData}
          />
        </div>
      </StoreFormWrapper>

      {/* 우산 위치 설명 */}
      <StoreFormWrapper label="우산 위치 설명" isRequired>
        <div className="flex gap-2 items-center">
          <TextField
            placeholder="upbrella"
            value={storeData.umbrellaLocation}
            name="umbrellaLocation"
            onChange={onChangeStoreData}
          />
        </div>
      </StoreFormWrapper>

      {/* 북마커 활성화 여부 */}
      <StoreFormWrapper label="북마커 활성화 여부" isRequired>
        <RadioGroup
          defaultValue="NO"
          value={storeData.activateStatus}
          name="activateStatus"
          onChange={onChangeStoreData}
        >
          <FormControlLabel value={true} control={<Radio />} label="YES" />
          <FormControlLabel value={false} control={<Radio />} label="NO" />
        </RadioGroup>
      </StoreFormWrapper>

      {/* 연락처 */}
      <StoreFormWrapper label="연락처">
        <div className="flex gap-2 items-center">
          <TextField
            placeholder="숫자만 입력해주세요."
            value={storeData.contactNumber}
            name="contactNumber"
            onChange={onChangeStoreData}
          />
        </div>
      </StoreFormWrapper>

      {/* 인스타그램 계정 */}
      <StoreFormWrapper label="인스타그램 계정">
        <div className="flex gap-2 items-center">
          @
          <TextField
            placeholder="upbrella"
            value={storeData.instagramId}
            name="instagramId"
            onChange={onChangeStoreData}
          />
        </div>
      </StoreFormWrapper>

      {/* 소개글 */}
      <StoreFormWrapper label="소개글">
        <TextareaAutosize
          placeholder="upbrella"
          minRows={3}
          style={{
            width: "300px",
            border: "1px solid black",
            borderColor: "rgba(0, 0, 0, 0.23)",
            borderRadius: "4px",
          }}
          name="content"
          onChange={onChangeStoreData}
          value={storeData.content}
        />
      </StoreFormWrapper>

      {/* 이미지 업로드 */}
      {/* <StoreFormWrapper label="이미지 업로드">
        <div className="flex gap-2 items-center">
          <TextField
            placeholder="upbrella"
            name="imageUrls"
            onChange={onChangeStoreData}
            value={storeData.imageUrls}
          />
        </div>
      </StoreFormWrapper> */}
    </div>
  );
};

export default StoreModalContents;
