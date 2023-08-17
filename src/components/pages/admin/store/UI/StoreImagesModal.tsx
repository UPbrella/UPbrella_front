import toast from "react-hot-toast";
import CustomModal from "@/components/organisms/Modal";
import { ChangeEvent } from "react";
import { useMutation, useQueryClient } from "react-query";
import { deleteStoreImage, postStoreImage } from "@/api/storeApi";
import CloseIcon from "@mui/icons-material/Close";
import { TStoreDetail } from "@/types/admin/StoreTypes";
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
  selectedStore: Pick<TStoreDetail, "id" | "name" | "imageUrls">;
};

function srcset(image: string, width: number, height: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format&dpr=2 2x`,
  };
}

const StoreImagesModal = ({ isOpen, onCloseModal, selectedStore }: TProps) => {
  const queryClient = useQueryClient();
  const { mutate: saveMutate, isLoading: isSaveLoading } = useMutation(postStoreImage);
  const { mutate: removeMutate, isLoading: isRemoveLoading } = useMutation(deleteStoreImage);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) return;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("image", files[i]);
    }

    saveMutate(
      { storeId: selectedStore.id, imageFile: formData },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["stores"]);
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
          queryClient.invalidateQueries(["stores"]);
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
      style={isSaveLoading || isRemoveLoading ? { pointerEvents: "none", opacity: "0.6" } : {}}
    >
      <div>
        {selectedStore.imageUrls.length ? (
          <ImageList
            sx={{
              maxWidth: "700px",
            }}
            gap={5}
          >
            {selectedStore.imageUrls.map(({ id, imageUrl }, i) => {
              // 현재는 첫번째 요소가 썸네일
              const isThumbnail = i === 0; // hack
              return (
                <ImageListItem
                  style={isThumbnail ? { border: "1px solid black" } : {}}
                  key={id}
                  cols={isThumbnail ? 2 : 1}
                >
                  <img {...srcset(imageUrl, 250, 250)} loading="lazy" />
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
                          <CloseIcon
                            style={{
                              fill: "whit",
                            }}
                          />
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
            이미지를 업로드 해주세요.
          </Typography>
        )}
      </div>
    </CustomModal>
  );
};

export default StoreImagesModal;
