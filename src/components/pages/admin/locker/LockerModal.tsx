import { useState } from "react";
import toast from "react-hot-toast";
import { Button, TextField } from "@mui/material";
import { usePostLockers, usePatchLockers, useDeleteLockers } from "@/hooks/queries/lockerQueries";
import { TAdminStoreDetail } from "@/types/admin/StoreTypes";
import { TLockersRes } from "@/types/admin/lockersTypes";
import SelectBox from "@/components/molecules/SelectBox";
import CustomModal from "@/components/organisms/Modal";
import StoreFormWrapper from "@/components/pages/admin/store/UI/StoreFormWrapper";

const SECRET_REMOVE_REGEX = /^0x/;

type TProps = {
  isOpen: boolean;
  handleClose: () => void;
  storesListRes: TAdminStoreDetail[];
  selectedLocker?: TLockersRes;
};

const MIN_LOCKER_SECRET_KEY_COUNT = 32;

const LockerModal = ({ isOpen, handleClose, storesListRes, selectedLocker }: TProps) => {
  const [storeId, setStoreId] = useState(selectedLocker?.storeMetaId);
  const [secretKey, setSecretKey] = useState(selectedLocker?.secretKey);

  const storeOptions = storesListRes.map(({ id, name }) => ({
    label: name,
    value: id,
  }));

  const { mutate: postMutateLocker, isLoading: isPostMutating } = usePostLockers();
  const { mutate: patchMutateLocker, isLoading: isPatchMutating } = usePatchLockers();
  const { mutate: deleteMutateLocker, isLoading: isDeleteMutating } = useDeleteLockers();

  // 추가
  const onClickCreateBtn = () => {
    if (!storeId || !secretKey) {
      toast.error("필수값을 입력해주세요.");
      return;
    }

    if (secretKey.length < MIN_LOCKER_SECRET_KEY_COUNT) {
      toast.error(`비밀번호는 최소 ${MIN_LOCKER_SECRET_KEY_COUNT}자 이상이여야합니다.`);
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

  // 수정
  const onClickUpdateBtn = () => {
    if (!selectedLocker) return;
    if (!storeId || !secretKey) {
      toast.error("필수값을 입력해주세요.");
      return;
    }

    if (secretKey.length < MIN_LOCKER_SECRET_KEY_COUNT) {
      toast.error(`비밀번호는 최소 ${MIN_LOCKER_SECRET_KEY_COUNT}자 이상이여야합니다.`);
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

  // 삭제
  const onClickDeleteBtn = () => {
    if (!selectedLocker) return;
    if (window.confirm("삭제하시겠습니까?")) {
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
        if (window.confirm("작성중인 내용이 모두 사라집니다.")) {
          handleClose();
        }
      }}
      titleText={`보관함 ${selectedLocker ? "수정 및 삭제" : "추가"}`}
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
              수정
            </Button>
            <Button
              color="error"
              size="large"
              autoFocus
              onClick={() => {
                onClickDeleteBtn();
              }}
            >
              삭제
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
            추가
          </Button>
        )
      }
    >
      <div className="flex flex-col gap-4 ">
        <StoreFormWrapper label="협업 지점" isRequired>
          <SelectBox
            label="지점"
            value={storeId ?? ""}
            name="selectedStoreId"
            menuItems={storeOptions}
            onChange={(_, value) => {
              setStoreId(value as number);
            }}
          />
        </StoreFormWrapper>

        <StoreFormWrapper label="보관함 비밀번호" isRequired>
          <TextField
            label="비밀번호"
            placeholder="ex.ASDF1234"
            value={secretKey}
            name="secretKey"
            onChange={(e) => setSecretKey(e.target.value)}
          />
        </StoreFormWrapper>
      </div>
    </CustomModal>
  );
};

export default LockerModal;
