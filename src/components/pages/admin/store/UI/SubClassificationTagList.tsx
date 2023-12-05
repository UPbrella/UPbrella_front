import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Chip, TextField } from "@mui/material";
import CustomModal from "@/components/organisms/Modal";
import useModalStatus from "@/hooks/custom/useModalStatus";
import ContentsTitle from "@/components/molecules/ContentsTitle";
import { TSubClassification } from "@/types/admin/StoreTypes";
import { useGetSubClassifications } from "@/hooks/queries/storeQueries";
import { deleteSubClassification, postSubClassification } from "@/api/storeApi";

type TTagDataState = Omit<TSubClassification, "id" | "type"> & { id?: number };

const SubClassificationTagList = () => {
  // client
  const { isOpen, handleOpen, handleClose } = useModalStatus();
  const [tagData, setTagData] = useState<TTagDataState>({ name: "" });

  // server
  const queryClient = useQueryClient();
  const { data: subClassificationsRes } = useGetSubClassifications();
  const { mutate: createMutate } = useMutation(postSubClassification);
  const { mutate: deleteMutate } = useMutation(deleteSubClassification);

  // create fn
  const onClickSaveBtn = () => {
    if (!tagData.name) {
      toast.error("이름을 입력해주세요.");
      return;
    }

    createMutate(tagData, {
      onError: () => {
        toast.error("생성에 실패했어요.");
        return;
      },
      onSuccess: () => {
        toast.success("태그 생성이 되었습니다.");
        queryClient.invalidateQueries(["subClassifications"]);
        handleClose();
        return;
      },
    });
  };

  // delete fn
  const onClickDeleteBtn = (id: number) => {
    if (window.confirm("정말 삭제하시겠습니까 ?")) {
      deleteMutate(id, {
        onError: () => {
          toast.error("삭제에 실패했어요.");
          return;
        },
        onSuccess: () => {
          toast.success("태그가 삭제 되었습니다.");
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
      <ContentsTitle title={"협업 지점 소개 페이지 내 지역 태그"}>
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
            추가
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

      {/* modal */}
      <CustomModal
        titleText={`협업 지점 소개 페이지 내 지역 태그 추가`}
        handleClose={() => {
          handleClose();
          setTagData({
            name: "",
          });
        }}
        isOpen={isOpen}
        footerContents={
          <Button size="large" onClick={onClickSaveBtn}>
            추가
          </Button>
        }
      >
        <div className={`flex flex-col gap-6 w-[400px]`}>
          <div className="flex items-center gap-5">
            태그 이름 :
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
