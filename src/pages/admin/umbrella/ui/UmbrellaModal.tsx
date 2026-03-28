import { TAdminStoreDetail } from "@/entities/store/model/types";
import {
  UMBRELLAS_QUERY_KEYS,
  usePatchUmbrellas,
  usePostUmbrellas,
} from "@/entities/umbrella/api/umbrella.queries";
import { TUmbrellaRes } from "@/entities/umbrella/model/types";
import { convertUmbrellaData } from "@/features/admin-umbrella/lib/umbrella-helpers";
import StoreFormWrapper from "@/pages/admin/store/ui/StoreFormWrapper";
import { getErrorMessage } from "@/shared/api/error";
import logo from "@/shared/assets/main_logo.svg";
import { TCustomError } from "@/shared/model/types";
import CustomModal from "@/shared/ui/Modal";
import SelectBox from "@/shared/ui/SelectBox";
import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { QRCodeCanvas } from "qrcode.react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

type TProps = {
  isOpen: boolean;
  handleClose: () => void;
  storeRes: TAdminStoreDetail[];
  umbrellaRes?: TUmbrellaRes;
  storeId: number;
  paginationParams: {
    storeId: number;
    page: number;
    size: number;
  };
};

const UmbrellaModal = ({
  isOpen,
  handleClose,
  storeRes,
  umbrellaRes,
  storeId,
  paginationParams,
}: TProps) => {
  const { t } = useTranslation();
  // client
  const [isReadOnly, setIsReadOnly] = useState(!!umbrellaRes);
  const [isDirty, setIsDirty] = useState(false);
  const [umbrellaData, setUmbrellaData] = useState(convertUmbrellaData(umbrellaRes));
  const QR_CODE_URL = `${window.location.origin}/rent/form/${umbrellaRes?.id}`;

  // server
  const queryClient = useQueryClient();
  const { mutate: postMutate, isLoading: isPostMutating } = usePostUmbrellas();
  const { mutate: patchMutate, isLoading: isPatchMutating } = usePatchUmbrellas();

  const storeFilter = storeId === 0 ? undefined : storeId;

  const onChangeData = (name: string, value: string | number | boolean) => {
    setIsDirty(true);
    setUmbrellaData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleCloseModal = () => {
    if (!isReadOnly && isDirty) {
      if (window.confirm(t("admin.common.discardConfirmAlt"))) {
        handleClose();
        return;
      }
      return;
    }

    handleClose();
  };

  const onClickSaveBtn = () => {
    if (!umbrellaData.storeMetaId || !umbrellaData.uuid) {
      toast.error(t("admin.common.requiredAllError"));
      return;
    }

    if (umbrellaRes) {
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
              queryClient.invalidateQueries(
                UMBRELLAS_QUERY_KEYS.getUmbrellas({
                  page: paginationParams.page,
                  size: paginationParams.size,
                  storeId: 0,
                })
              ),
              queryClient.invalidateQueries(UMBRELLAS_QUERY_KEYS.getUmbrellas(paginationParams)),
              queryClient.invalidateQueries(
                UMBRELLAS_QUERY_KEYS.getUmbrellasStatistics(storeFilter)
              ),
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
            queryClient.invalidateQueries(
              UMBRELLAS_QUERY_KEYS.getUmbrellas({
                page: paginationParams.page,
                size: paginationParams.size,
                storeId: 0,
              })
            ),
            queryClient.invalidateQueries(UMBRELLAS_QUERY_KEYS.getUmbrellas(paginationParams)),
            queryClient.invalidateQueries(UMBRELLAS_QUERY_KEYS.getUmbrellasStatistics(storeFilter)),
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
      titleText={umbrellaRes ? t("admin.umbrella.modalEdit") : t("admin.umbrella.modalAdd")}
      footerContents={
        isReadOnly ? (
          <>
            <Button size="large" variant="contained" onClick={() => setIsReadOnly(false)}>
              {t("admin.common.edit")}
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
                  if (window.confirm(t("admin.common.cancelConfirm"))) {
                    setIsReadOnly(true);
                    setUmbrellaData(convertUmbrellaData(umbrellaRes));
                  }
                }}
              >
                {t("admin.common.cancel")}
              </Button>
            )}
            <Button
              size="large"
              variant="contained"
              onClick={() => {
                onClickSaveBtn();
              }}
            >
              {t("admin.common.save")}
            </Button>
          </>
        )
      }
    >
      <div className="flex flex-col gap-4">
        <StoreFormWrapper label={t("admin.umbrella.form.uuid")} isRequired={!isReadOnly}>
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

        <StoreFormWrapper label={t("admin.umbrella.form.location")} isRequired={!isReadOnly}>
          <div>
            {isReadOnly ? (
              <>
                {storeRes.find((e) => e.id === umbrellaData.storeMetaId)?.name} (
                {umbrellaData.storeMetaId})
              </>
            ) : (
              <SelectBox
                label={t("admin.umbrella.form.storeLabel")}
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

        <StoreFormWrapper label={t("admin.umbrella.form.rentable")} isRequired={!isReadOnly}>
          <div>
            {isReadOnly ? (
              <>
                {umbrellaData.rentable
                  ? t("admin.umbrella.form.rentableYes")
                  : t("admin.umbrella.form.rentableNo")}
              </>
            ) : (
              <RadioGroup
                value={umbrellaData.rentable}
                name="rentable"
                onChange={(e) => {
                  const { name, value } = e.target;
                  onChangeData(name, value);
                }}
              >
                <div>
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label={t("admin.umbrella.form.rentableYes")}
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label={t("admin.umbrella.form.rentableNo")}
                  />
                </div>
              </RadioGroup>
            )}
          </div>
        </StoreFormWrapper>

        {!isReadOnly && umbrellaRes && (
          <StoreFormWrapper label={t("admin.umbrella.form.missing")}>
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

        <StoreFormWrapper label={t("admin.umbrella.form.etc")}>
          <div>
            {isReadOnly ? (
              <>{umbrellaData.etc}</>
            ) : (
              <TextareaAutosize
                placeholder={t("admin.umbrella.form.etcPlaceholder")}
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
          <StoreFormWrapper label={t("admin.umbrella.form.qr")}>
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
                {t("admin.store.qrDownload")}
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
