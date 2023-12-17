import SelectBox from "@/components/molecules/SelectBox";
import CustomModal from "@/components/organisms/Modal";
import StoreFormWrapper from "@/components/pages/admin/store/UI/StoreFormWrapper";
import { convertUmbrellaData } from "@/components/pages/admin/umbrella/helper";
import {
  UMBRELLAS_QUERY_KEYS,
  usePatchUmbrellas,
  usePostUmbrellas,
} from "@/hooks/queries/umbrellaQueries";
import { TAdminStoreDetail } from "@/types/admin/StoreTypes";
import { TUmbrellaRes } from "@/types/admin/umbrellaTypes";
import { TCustomError } from "@/types/commonTypes";
import { getErrorMessage } from "@/utils/error";
import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { QRCodeCanvas } from "qrcode.react";
import logo from "@/assets/main_logo.svg";

type TProps = {
  isOpen: boolean;
  handleClose: () => void;
  storeRes: TAdminStoreDetail[];
  umbrellaRes?: TUmbrellaRes;
  storeId: number;
};

const UmbrellaModal = ({ isOpen, handleClose, storeRes, umbrellaRes, storeId }: TProps) => {
  // client
  const [isReadOnly, setIsReadOnly] = useState(!!umbrellaRes);
  const [umbrellaData, setUmbrellaData] = useState(convertUmbrellaData(umbrellaRes));
  const QR_CODE_URL = `${window.location.origin}/rent/form/${umbrellaRes?.id}`;

  // server
  const queryClient = useQueryClient();
  const { mutate: postMutate, isLoading: isPostMutating } = usePostUmbrellas();
  const { mutate: patchMutate, isLoading: isPatchMutating } = usePatchUmbrellas();

  const storeFilter = storeId === 0 ? undefined : storeId;

  const onChangeData = (name: string, value: string | number | boolean) => {
    setUmbrellaData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleCloseModal = () => {
    if (!isReadOnly) {
      if (window.confirm("작성하고 있는 내용이 사라집니다.")) {
        handleClose();
        return;
      }
      return;
    }

    handleClose();
  };

  const onClickSaveBtn = () => {
    if (!umbrellaData.storeMetaId || !umbrellaData.uuid) {
      toast.error("필수값을 모두 입력해주세요.");
      return;
    }

    if (umbrellaRes) {
      // 수정
      patchMutate(
        {
          umbrellaId: umbrellaRes.id,
          data: {
            storeMetaId: umbrellaData.storeMetaId,
            uuid: umbrellaData.uuid,
            rentable: umbrellaData.rentable,
            etc: umbrellaData.etc,
            missed: umbrellaData.missed,
          },
        },
        {
          onError: (err) => {
            const error = err as TCustomError;
            toast.error(getErrorMessage(error));
          },
          onSuccess: () => {
            handleClose();
            Promise.all([
              queryClient.invalidateQueries([...UMBRELLAS_QUERY_KEYS.getUmbrellas(storeFilter)]),
              queryClient.invalidateQueries([
                ...UMBRELLAS_QUERY_KEYS.getUmbrellasStatistics(storeFilter),
              ]),
            ]);
          },
        }
      );
      return;
    }

    postMutate(
      {
        storeMetaId: umbrellaData.storeMetaId,
        uuid: umbrellaData.uuid,
        rentable: umbrellaData.rentable,
        etc: umbrellaData.etc,
      },
      {
        onError: (err) => {
          const error = err as TCustomError;
          toast.error(getErrorMessage(error));
        },
        onSuccess: () => {
          handleClose();
          Promise.all([
            queryClient.invalidateQueries([...UMBRELLAS_QUERY_KEYS.getUmbrellas(storeFilter)]),
            queryClient.invalidateQueries([
              ...UMBRELLAS_QUERY_KEYS.getUmbrellasStatistics(storeFilter),
            ]),
          ]);
        },
      }
    );
  };

  const handleDownloadClick = () => {
    const canvas = document.querySelector("canvas");
    const url = canvas ? canvas.toDataURL("image/png") : "";
    const link = document.createElement("a");
    link.href = url;
    link.download = `qr-umbrellaId-${umbrellaRes?.id}.png`;
    link.click();
  };

  const isLoading = isPostMutating || isPatchMutating;

  return (
    <CustomModal
      isLoading={isLoading}
      isOpen={isOpen}
      handleClose={handleCloseModal}
      titleText={`우산 ${umbrellaRes ? "수정" : "추가"}`}
      footerContents={
        isReadOnly ? (
          <>
            <Button size="large" variant="contained" onClick={() => setIsReadOnly(false)}>
              수정
            </Button>
          </>
        ) : (
          <>
            {umbrellaRes && (
              <Button
                color="error"
                size="large"
                variant="outlined"
                onClick={() => {
                  if (window.confirm("취소하시겠습니까?")) {
                    setIsReadOnly(true);
                    setUmbrellaData(convertUmbrellaData(umbrellaRes));
                  }
                }}
              >
                취소
              </Button>
            )}
            <Button
              size="large"
              variant="contained"
              onClick={() => {
                onClickSaveBtn();
              }}
            >
              저장
            </Button>
          </>
        )
      }
    >
      <div className="flex flex-col gap-4">
        {/* number */}
        <StoreFormWrapper label="우산 관리번호" isRequired={!isReadOnly}>
          <div>
            {isReadOnly ? (
              <>{umbrellaData.uuid}</>
            ) : (
              <TextField
                type="number"
                placeholder="ex. 1234"
                value={umbrellaData.uuid ?? ""}
                name="uuid"
                onChange={(e) => {
                  const { name, value } = e.target;
                  onChangeData(name, value);
                }}
              />
            )}
          </div>
        </StoreFormWrapper>

        {/* 지점 */}
        <StoreFormWrapper label="현위치" isRequired={!isReadOnly}>
          <div>
            {isReadOnly ? (
              <>
                {storeRes.find((e) => e.id === umbrellaData.storeMetaId)?.name} (
                {umbrellaData.storeMetaId})
              </>
            ) : (
              <SelectBox
                label="지점" // 명칭 미정
                value={umbrellaData.storeMetaId ?? ""}
                name="storeMetaId"
                onChange={(name, value) => {
                  if (value === null) return;
                  onChangeData(name, value);
                  return;
                }}
                menuItems={storeRes.map((e) => ({ label: e.name, value: e.id }))}
              />
            )}
          </div>
        </StoreFormWrapper>

        {/* 대여가능 여부 */}
        <StoreFormWrapper label="대여 가능 여부" isRequired={!isReadOnly}>
          <div>
            {isReadOnly ? (
              <>{umbrellaData.rentable ? "대여 가능" : "대여 불가능"}</>
            ) : (
              <RadioGroup
                value={umbrellaData.rentable}
                name="rentable"
                // onChange={onChangeStoreData}
                onChange={(e) => {
                  const { name, value } = e.target;
                  onChangeData(name, value);
                }}
              >
                <div>
                  <FormControlLabel value={true} control={<Radio />} label="대여 가능" />
                  <FormControlLabel value={false} control={<Radio />} label="대여 불가능" />
                </div>
              </RadioGroup>
            )}
          </div>
        </StoreFormWrapper>

        {/* 분실 여부 */}
        {!isReadOnly && umbrellaRes && (
          <StoreFormWrapper label="분실 여부">
            <div>
              <RadioGroup
                value={umbrellaData.missed}
                name="missed"
                onChange={(e) => {
                  const { name, value } = e.target;
                  onChangeData(name, value === "true" ? true : false);
                }}
              >
                <div>
                  <FormControlLabel value={true} control={<Radio />} label="O" />
                  <FormControlLabel value={false} control={<Radio />} label="X" />
                </div>
              </RadioGroup>
            </div>
          </StoreFormWrapper>
        )}

        <StoreFormWrapper label="비고">
          <div>
            {isReadOnly ? (
              <>{umbrellaData.etc}</>
            ) : (
              <TextareaAutosize
                placeholder="기타 사항을 작성해주세요."
                value={umbrellaData.etc ?? ""}
                name="etc"
                onChange={(e) => {
                  const { name, value } = e.target;
                  onChangeData(name, value);
                }}
                minRows={3}
                style={{
                  width: "300px",
                  border: "1px solid black",
                  borderColor: "rgba(0, 0, 0, 0.23)",
                  borderRadius: "4px",
                }}
              />
            )}
          </div>
        </StoreFormWrapper>

        {isReadOnly && umbrellaRes && (
          <StoreFormWrapper label="QR코드">
            <div className="flex flex-col items-center gap-[4px]">
              <QRCodeCanvas
                size={200}
                includeMargin
                value={QR_CODE_URL}
                imageSettings={{
                  src: logo,
                  height: 50,
                  width: 50,
                  excavate: false,
                }}
              />
              <Button variant="contained" onClick={handleDownloadClick}>
                QR 이미지 다운로드
              </Button>
              <div>{QR_CODE_URL}</div>
            </div>
          </StoreFormWrapper>
        )}
      </div>
    </CustomModal>
  );
};

export default UmbrellaModal;
