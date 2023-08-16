import { useState } from "react";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { Button, Chip } from "@mui/material";
import useModalStatus from "@/hooks/custom/useModalStatus";
import { deleteClassification, postClassification } from "@/api/storeApi";
import { useGetClassifications } from "@/hooks/queries/storeQueries";
import ContentsTitle from "@/components/molecules/ContentsTitle";
import ClassificationTagModal from "@/components/pages/admin/store/UI/StoreTagModal";
import { ClassificationTagInitializer } from "@/components/pages/admin/store/helper";

const ClassificationTagList = () => {
  // client
  const { isOpen, handleOpen, handleClose } = useModalStatus();
  const [selectedId, setSelectedId] = useState<number>();
  const [tagData, setTagData] = useState(ClassificationTagInitializer());

  // server
  const queryClient = useQueryClient();
  const { data: classificationsRes } = useGetClassifications();
  const { mutate: createMutate } = useMutation(postClassification);
  const { mutate: deleteMutate } = useMutation(deleteClassification);

  // create fn
  const onClickSaveBtn = () => {
    if (!tagData.name || !tagData.latitude || !tagData.longitude) {
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
        queryClient.invalidateQueries(["classifications"]);
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
          queryClient.invalidateQueries(["classifications"]);
          return;
        },
      });
    }
  };

  return (
    <>
      <ContentsTitle title={"대여소 위치 페이지 내 지역 태그"}>
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
            추가
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

      {/* modal */}
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
