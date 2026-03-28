import { useState } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Chip } from "@mui/material";
import useModalStatus from "@/shared/hooks/useModalStatus";
import { deleteClassification, postClassification } from "@/entities/store/api/store-api";
import { useGetClassifications } from "@/entities/store/api/store.queries";
import ContentsTitle from "@/shared/ui/ContentsTitle";
import { ClassificationTagInitializer } from "@/features/admin-store/lib/store-helpers";
import ClassificationTagModal from "@/pages/admin/store/ui/ClassificationTagModal";

const ClassificationTagList = () => {
  const { t } = useTranslation();
  // client
  const { isOpen, handleOpen, handleClose } = useModalStatus();
  const [selectedId, setSelectedId] = useState<number>();
  const [tagData, setTagData] = useState(ClassificationTagInitializer());

  // server
  const queryClient = useQueryClient();
  const { data: classificationsRes } = useGetClassifications();
  const { mutate: createMutate } = useMutation(postClassification);
  const { mutate: deleteMutate } = useMutation(deleteClassification);

  const onClickSaveBtn = () => {
    if (!tagData.name || !tagData.latitude || !tagData.longitude) {
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
        queryClient.invalidateQueries(["classifications"]);
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
          queryClient.invalidateQueries(["classifications"]);
          return;
        },
      });
    }
  };

  return (
    <>
      <ContentsTitle title={t("admin.store.tag.regionTitle")}>
        <>
          <Button
            variant="contained"
            onClick={() => {
              handleOpen();
              setTagData(ClassificationTagInitializer());
              setSelectedId(undefined);
              return;
            }}
          >
            {t("admin.common.add")}
          </Button>
        </>
      </ContentsTitle>

      <div className="flex gap-5 flex-wrap">
        {classificationsRes?.map(({ id, name }) => {
          return (
            <Chip
              key={id}
              label={name}
              variant="outlined"
              onClick={() => {
                const foundRes = classificationsRes.find((res) => res.id === id);
                setTagData(ClassificationTagInitializer(foundRes));
                setSelectedId(id);
                handleOpen();
              }}
              onDelete={() => {
                onClickDeleteBtn(id);
              }}
            />
          );
        })}
      </div>

      {isOpen && (
        <ClassificationTagModal
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          isOpen={isOpen}
          handleClose={handleClose}
          onClickSaveBtn={onClickSaveBtn}
          tagData={tagData}
          setTagData={setTagData}
        />
      )}
    </>
  );
};

export default ClassificationTagList;
