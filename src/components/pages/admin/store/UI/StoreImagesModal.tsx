import toast from "react-hot-toast";
import CustomModal from "@/components/organisms/Modal";
import { ChangeEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStoreImage, postStoreImage } from "@/api/storeApi";
import CloseIcon from "@mui/icons-material/Close";
import { TAdminStoreDetail } from "@/types/admin/StoreTypes";
import { STORE_QUERY_KEYS, useGetStoreImages } from "@/hooks/queries/storeQueries";
import {
  Button,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";

type TProps = {
  isOpen: boolean;
  onCloseModal: () => void;
  selectedStore: Pick<TAdminStoreDetail, "id" | "name">;
};

const StoreImagesModal = ({ isOpen, onCloseModal, selectedStore }: TProps) => {
  const queryClient = useQueryClient();
  const { mutate: saveMutate, isLoading: isSaveLoading } = useMutation(postStoreImage);
  const { mutate: removeMutate, isLoading: isRemoveLoading } = useMutation(deleteStoreImage);
  const { data: imagesRes, isLoading, isError } = useGetStoreImages(selectedStore.id);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) return;

    const MAX_SIZE = 1024 * 1024 * 10; // 10MB

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("image", files[i]);
      const fileSize = files[i].size;
      if (fileSize > MAX_SIZE) {
        toast.error("이미지 업로드 용량은 최대 10MB 입니다.");
        return;
      }
    }

    saveMutate(
      { storeId: selectedStore.id, imageFile: formData },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([...STORE_QUERY_KEYS.storeImages(selectedStore.id)]);
          toast.success("이미지 업로드 성공 !");
          return;
        },
        onError: () => {
          toast.error("이미지 업로드에 실패했어요.");
          return;
        },
      }
    );
  };

  const onRemoveImage = (imageId: number) => {
    if (window.confirm("정말 삭제하시겠습니까 ?")) {
      removeMutate(imageId, {
        onSuccess: () => {
          queryClient.invalidateQueries([...STORE_QUERY_KEYS.storeImages(selectedStore.id)]);
          toast.success("이미지 삭제 성공 !");
          return;
        },
        onError: () => {
          toast.error("이미지 삭제에 실패했어요.");
          return;
        },
      });
    }
  };

  return (
    <CustomModal
      isOpen={isOpen}
      handleClose={onCloseModal}
      titleText={`협업지점 이미지 업로드 및 조회`}
      isLoading={isSaveLoading || isRemoveLoading}
      footerContents={
        <Button variant="contained" component="label">
          이미지 업로드
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            onClick={(e) => (e.currentTarget.value = "")}
            hidden
          />
        </Button>
      }
    >
      <div>
        {imagesRes && imagesRes.length ? (
          <ImageList
            sx={{
              maxWidth: "700px",
            }}
            gap={5}
          >
            {imagesRes.map(({ id, imageUrl }, i) => {
              // 현재는 첫번째 요소가 썸네일
              const isThumbnail = i === 0; // hack
              return (
                <ImageListItem
                  style={isThumbnail ? { border: "1px solid black" } : {}}
                  key={id}
                  cols={isThumbnail ? 2 : 1}
                >
                  <img src={imageUrl} loading="lazy" />
                  <ImageListItemBar
                    sx={{
                      background: isThumbnail ? "linear-gradient(to top, white , black)" : "none",
                    }}
                    position="top"
                    actionIcon={
                      <div className="flex items-center gap-8">
                        <IconButton
                          onClick={() => {
                            onRemoveImage(id);
                            return;
                          }}
                        >
                          <CloseIcon />
                        </IconButton>
                        {i === 0 && (
                          <Typography className="py-8" variant="h5" color="white">
                            썸네일
                          </Typography>
                        )}
                      </div>
                    }
                    actionPosition="left"
                  />
                </ImageListItem>
              );
            })}
          </ImageList>
        ) : (
          <Typography variant="h6" className="text-center min-w-[500px] my-16">
            {isLoading ? "Loading..." : isError ? "Server Error" : "이미지를 업로드 해주세요."}
          </Typography>
        )}
      </div>
    </CustomModal>
  );
};

export default StoreImagesModal;
