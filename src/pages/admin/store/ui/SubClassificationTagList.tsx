import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Chip, TextField } from "@mui/material";
import CustomModal from "@/shared/ui/Modal";
import useModalStatus from "@/shared/hooks/useModalStatus";
import ContentsTitle from "@/shared/ui/ContentsTitle";
import { TSubClassification } from "@/entities/store/model/types";
import { useGetSubClassifications } from "@/entities/store/api/store.queries";
import { deleteSubClassification, postSubClassification } from "@/entities/store/api/store-api";

type TTagDataState = Omit<TSubClassification, "id" | "type"> & { id?: number };

const SubClassificationTagList = () => {
  const { t } = useTranslation();
  // client
  const { isOpen, handleOpen, handleClose } = useModalStatus();
  const [tagData, setTagData] = useState<TTagDataState>({ name: "" });

  // server
  const queryClient = useQueryClient();
  const { data: subClassificationsRes } = useGetSubClassifications();
  const { mutate: createMutate } = useMutation(postSubClassification);
  const { mutate: deleteMutate } = useMutation(deleteSubClassification);

  const onClickSaveBtn = () => {
    if (!tagData.name) {
      toast.error(t("admin.store.tag.nameError"));
      return;
    }

    createMutate(tagData, {
      onError: () => {
        toast.error(t("admin.store.toast.createFail"));
        return;
      },
      onSuccess: () => {
        toast.success(t("admin.store.tag.createSuccess"));
        queryClient.invalidateQueries(["subClassifications"]);
        handleClose();
        return;
      },
    });
  };

  const onClickDeleteBtn = (id: number) => {
    if (window.confirm(t("admin.common.deleteConfirm"))) {
      deleteMutate(id, {
        onError: () => {
          toast.error(t("admin.store.toast.deleteFail"));
          return;
        },
        onSuccess: () => {
          toast.success(t("admin.store.tag.deleteSuccess"));
          queryClient.invalidateQueries(["subClassifications"]);
          return;
        },
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      onClickSaveBtn();
    }
  };

  return (
    <>
      <ContentsTitle title={t("admin.store.tag.officeTitle")}>
        <>
          <Button
            variant="contained"
            onClick={() => {
              handleOpen();
              setTagData({
                name: "",
              });
            }}
          >
            {t("admin.common.add")}
          </Button>
        </>
      </ContentsTitle>

      <div className="flex gap-5 flex-wrap">
        {subClassificationsRes?.map(({ id, name }) => {
          return (
            <Chip
              key={id}
              label={name}
              variant="outlined"
              onClick={() => {
                onClickDeleteBtn(id);
                return;
              }}
              onDelete={() => {
                onClickDeleteBtn(id);
                return;
              }}
            />
          );
        })}
      </div>

      <CustomModal
        titleText={t("admin.store.tag.officeAddTitle")}
        handleClose={() => {
          handleClose();
          setTagData({
            name: "",
          });
        }}
        isOpen={isOpen}
        footerContents={
          <Button size="large" onClick={onClickSaveBtn}>
            {t("admin.common.add")}
          </Button>
        }
      >
        <div className={`flex flex-col gap-6 w-[400px]`}>
          <div className="flex items-center gap-5">
            {t("admin.store.tag.nameLabel")}
            <TextField
              autoFocus
              variant="standard"
              value={tagData?.name}
              onKeyDown={handleKeyDown}
              onChange={({ target: { value } }) => {
                setTagData((prev) => ({
                  ...prev,
                  name: value,
                }));
              }}
            />
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default SubClassificationTagList;
