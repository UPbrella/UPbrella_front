import StoreFormWrapper from "@/components/pages/admin/store/StoreFormWrapper";
import useModalStatus from "@/hooks/custom/useModalStatus";
import { TStoreDetail } from "@/types/admin/StoreTypes";
import {
  Button,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import DaumPostcode from "react-daum-postcode";

type TProps = {
  storeData: TStoreDetail;
  onChangeStoreData: (e: { target: { name: string; value: string | number } }) => void;
};

const StoreModalBody = ({ storeData, onChangeStoreData }: TProps) => {
  const {
    isOpen: isOpenAddress,
    handleOpen: handleOpenAddress,
    handleClose: handleCloseAddress,
  } = useModalStatus();

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

      {/* 영업 시간 */}
      <StoreFormWrapper label="영업 시간" isRequired>
        <TextField
          placeholder="10:00 ~ 18:00"
          value={storeData.businessHours}
          name="businessHours"
          onChange={onChangeStoreData}
        />
      </StoreFormWrapper>

      {/* 연락처 */}
      <StoreFormWrapper label="연락처">
        <div className="flex gap-2 items-center">
          <TextField
            placeholder="010-0000-0000"
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
            // name="name"
            // onChange={onChangeStoreData}
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
      <StoreFormWrapper label="이미지 업로드">
        <div className="flex gap-2 items-center">
          <TextField
            placeholder="upbrella"
            name="imageUrls"
            onChange={onChangeStoreData}
            value={storeData.imageUrls}
          />
        </div>
      </StoreFormWrapper>

      {/* 북마커 활성화 여부 */}
      <StoreFormWrapper label="북마커 활성화 여부">
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

      {/* 대여소 위치 내 지역 태그 */}
      <StoreFormWrapper label="대여소 위치 내 지역 태그">
        <Select
          value={storeData.classification}
          style={{ width: "200px" }}
          name="classification"
          onChange={onChangeStoreData}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </StoreFormWrapper>

      {/* 협업지점 소개페이지 내 지역 태그 */}
      <StoreFormWrapper label="협업지점 소개페이지 내 지역 태그">
        <Select
          value={storeData.subClassification}
          style={{ width: "200px" }}
          name="subClassification"
          onChange={onChangeStoreData}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </StoreFormWrapper>
    </div>
  );
};

export default StoreModalBody;
