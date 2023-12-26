import StoreFormWrapper from "@/components/pages/admin/store/UI/StoreFormWrapper";
import { TStoreBusinessHours, TStoreParams } from "@/types/admin/StoreTypes";
import { Button, TextField, TextareaAutosize, Typography } from "@mui/material";
import SelectBox from "@/components/molecules/SelectBox";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { createSelectItems } from "@/utils/selectBox";
import { DAY_OF_WEEK } from "@/constants/Date";
import {
  createClassificationsOptions,
  getFilterBusinessTime,
} from "@/components/pages/admin/store/helper";
import { TDayOfWeek } from "@/types/commonTypes";
import {
  useGetClassifications,
  useGetStoreBusinessHours,
  useGetSubClassifications,
} from "@/hooks/queries/storeQueries";
import StoreAddressInput from "@/components/pages/admin/store/UI/StoreAddressInput";

type TProps = {
  storeData: TStoreParams;
  setStoreData: Dispatch<SetStateAction<TStoreParams>>;
  onChangeStoreData: (e: {
    target: { name: string; value: string | number | null | TStoreBusinessHours[] };
  }) => void;
  selectedStoreId?: number;
};

const StoreModalContents = ({
  storeData,
  setStoreData,
  onChangeStoreData,
  selectedStoreId,
}: TProps) => {
  const [dayInputState, setDayInputState] = useState<TStoreBusinessHours>({
    date: "MONDAY",
    openAt: "11:00",
    closeAt: "20:00",
  });

  // server
  const { data: classifiRes } = useGetClassifications();
  const { data: subClassifiRes } = useGetSubClassifications();
  const {
    data: businessHoursRes,
    isLoading: isBusinessHLoading,
    isError: isBusinessHError,
    refetch: refetchBusinessH,
  } = useGetStoreBusinessHours(selectedStoreId ?? 0);

  useEffect(() => {
    if (businessHoursRes) {
      setStoreData((prev) => ({
        ...prev,
        businessHours: businessHoursRes,
      }));
    }
  }, [businessHoursRes, setStoreData]);

  const classifiOptions = createClassificationsOptions(classifiRes);
  const subClassifiOptions = createClassificationsOptions(subClassifiRes);

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
    <div className="flex flex-col gap-4 min-w-[700px]">
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

      {/* 대여소 위치 내 지역 태그 */}
      <StoreFormWrapper label="대여소 위치 내 지역 태그" isRequired>
        <div>
          <SelectBox
            label="대분류" // 명칭 미정
            value={storeData.classificationId ?? ""}
            name="classificationId"
            onChange={(name, value) => onChangeStoreData({ target: { name, value } })}
            menuItems={classifiOptions}
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
            menuItems={subClassifiOptions}
          />
        </div>
      </StoreFormWrapper>

      {/* 영업 시간 - 화면 출력용 */}
      <StoreFormWrapper label="영업 시간(화면 출력용)" isRequired>
        <TextareaAutosize
          placeholder="매일 12:30 ~ 23:00"
          value={storeData.businessHour}
          name="businessHour"
          onChange={onChangeStoreData}
          minRows={3}
          style={{
            width: "300px",
            border: "1px solid black",
            borderColor: "rgba(0, 0, 0, 0.23)",
            borderRadius: "4px",
          }}
        />
      </StoreFormWrapper>

      {/* 영업 시간 - 마커 활성화 여부용 */}
      <StoreFormWrapper label="영업 시간(마커 활성화 여부용)" isRequired>
        {isBusinessHError ? (
          <div className="flex items-center gap-8">
            서버 에러입니다.
            <Button variant="contained" color="warning" onClick={() => refetchBusinessH()}>
              다시 시도
            </Button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-4 w-[600px] lg:flex-col lg:w-auto">
              <SelectBox
                label="요일"
                value={dayInputState.date}
                name="date"
                onChange={onChangeDayInput}
                menuItems={createSelectItems(DAY_OF_WEEK)}
              />
              <div className="flex items-center gap-2">
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
                <Button
                  onClick={onClickHourAdd}
                  disabled={!!(selectedStoreId && isBusinessHLoading)}
                >
                  추가
                </Button>
              </div>
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
        )}
      </StoreFormWrapper>

      {/* 주소, 상세주소 */}
      <StoreFormWrapper label="주소" isRequired>
        <StoreAddressInput
          storeData={storeData}
          setStoreData={setStoreData}
          onChangeStoreData={onChangeStoreData}
        />
      </StoreFormWrapper>

      {/* 우산 위치 설명 */}
      <StoreFormWrapper label="우산 위치 설명" isRequired>
        <div className="flex items-center gap-2">
          <TextField
            placeholder="upbrella"
            value={storeData.umbrellaLocation}
            name="umbrellaLocation"
            onChange={onChangeStoreData}
          />
        </div>
      </StoreFormWrapper>

      {/* 연락처 */}
      <StoreFormWrapper label="연락처">
        <div className="flex items-center gap-2">
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
        <div className="flex items-center gap-2">
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
        <div className="flex flex-col items-end gap-2">
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
          <span>{storeData.content.length} / 200자 입력 가능</span>
        </div>
      </StoreFormWrapper>
    </div>
  );
};

export default StoreModalContents;
