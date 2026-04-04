import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Button, TextField } from "@mui/material";
import {
  usePostLockers,
  usePatchLockers,
  useDeleteLockers,
} from "@/entities/locker/api/locker.queries";
import { TAdminStoreDetail } from "@/entities/store/model/types";
import { TLockersRes } from "@/entities/locker/model/types";
import SelectBox from "@/shared/ui/SelectBox";
import CustomModal from "@/shared/ui/Modal";
import StoreFormWrapper from "@/pages/admin/store/ui/StoreFormWrapper";

const SECRET_REMOVE_REGEX = /^0x/;

type TProps = {
  isOpen: boolean;
  handleClose: () => void;
  storesListRes: TAdminStoreDetail[];
  selectedLocker?: TLockersRes;
};

const MIN_LOCKER_SECRET_KEY_COUNT = 32;

const LockerModal = ({ isOpen, handleClose, storesListRes, selectedLocker }: TProps) => {
  const { t } = useTranslation();
  const [isDirty, setIsDirty] = useState(false);
  const [storeId, setStoreId] = useState(selectedLocker?.storeMetaId);
  const [secretKey, setSecretKey] = useState(selectedLocker?.secretKey);

  const storeOptions = storesListRes.map(({ id, name }) => ({
    label: name,
    value: id,
  }));

  const { mutate: postMutateLocker, isLoading: isPostMutating } = usePostLockers();
  const { mutate: patchMutateLocker, isLoading: isPatchMutating } = usePatchLockers();
  const { mutate: deleteMutateLocker, isLoading: isDeleteMutating } = useDeleteLockers();

  const onClickCreateBtn = () => {
    if (!storeId || !secretKey) {
      toast.error(t("admin.common.requiredError"));
      return;
    }

    if (secretKey.length < MIN_LOCKER_SECRET_KEY_COUNT) {
      toast.error(t("admin.locker.form.secretMinError", { count: MIN_LOCKER_SECRET_KEY_COUNT }));
      return;
    }

    postMutateLocker(
      { secretKey: secretKey.replace(SECRET_REMOVE_REGEX, ""), storeId },
      {
        onSuccess: () => {
          handleClose();
        },
      }
    );
  };

  const onClickUpdateBtn = () => {
    if (!selectedLocker) return;
    if (!storeId || !secretKey) {
      toast.error(t("admin.common.requiredError"));
      return;
    }

    if (secretKey.length < MIN_LOCKER_SECRET_KEY_COUNT) {
      toast.error(t("admin.locker.form.secretMinError", { count: MIN_LOCKER_SECRET_KEY_COUNT }));
      return;
    }

    patchMutateLocker(
      {
        lockerId: selectedLocker.id,
        data: { storeId, secretKey: secretKey.replace(SECRET_REMOVE_REGEX, "") },
      },
      {
        onSuccess: () => {
          handleClose();
        },
      }
    );
  };

  const onClickDeleteBtn = () => {
    if (!selectedLocker) return;
    if (window.confirm(t("admin.locker.deleteConfirm"))) {
      deleteMutateLocker(selectedLocker.id, {
        onSuccess: () => {
          handleClose();
        },
      });
    }
  };

  return (
    <CustomModal
      isOpen={isOpen}
      handleClose={() => {
        if (isDirty) {
          if (window.confirm(t("admin.common.discardConfirm"))) {
            handleClose();
          }
          return;
        }
        handleClose();
      }}
      titleText={selectedLocker ? t("admin.locker.modalEdit") : t("admin.locker.modalAdd")}
      isLoading={isPostMutating || isPatchMutating || isDeleteMutating}
      footerContents={
        selectedLocker ? (
          <>
            <Button
              size="large"
              autoFocus
              onClick={() => {
                onClickUpdateBtn();
              }}
            >
              {t("admin.common.edit")}
            </Button>
            <Button
              color="error"
              size="large"
              autoFocus
              onClick={() => {
                onClickDeleteBtn();
              }}
            >
              {t("admin.common.delete")}
            </Button>
          </>
        ) : (
          <Button
            size="large"
            autoFocus
            onClick={() => {
              onClickCreateBtn();
            }}
          >
            {t("admin.common.add")}
          </Button>
        )
      }
    >
      <div className="flex flex-col gap-4 ">
        <StoreFormWrapper label={t("admin.locker.form.store")} isRequired>
          <SelectBox
            label={t("admin.locker.form.storeLabel")}
            value={storeId ?? ""}
            name="selectedStoreId"
            menuItems={storeOptions}
            onChange={(_, value) => {
              setIsDirty(true);
              setStoreId(value as number);
            }}
          />
        </StoreFormWrapper>

        <StoreFormWrapper label={t("admin.locker.form.secretKey")} isRequired>
          <TextField
            label={t("admin.locker.form.secretLabel")}
            placeholder="ex.ASDF1234"
            value={secretKey}
            name="secretKey"
            onChange={(e) => {
              setIsDirty(true);
              setSecretKey(e.target.value);
            }}
          />
        </StoreFormWrapper>
      </div>
    </CustomModal>
  );
};

export default LockerModal;
