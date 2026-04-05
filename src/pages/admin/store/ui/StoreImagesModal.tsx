import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import CustomModal from "@/shared/ui/Modal";
import { ChangeEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStoreImage, postStoreImage } from "@/entities/store/api/store-api";
import CloseIcon from "@mui/icons-material/Close";
import { TAdminStoreDetail } from "@/entities/store/model/types";
import { STORE_QUERY_KEYS, useGetStoreImages } from "@/entities/store/api/store.queries";
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
  const { t } = useTranslation();
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
        toast.error(t("admin.store.image.maxSize"));
        return;
      }
    }

    saveMutate(
      { storeId: selectedStore.id, imageFile: formData },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([...STORE_QUERY_KEYS.storeImages(selectedStore.id)]);
          toast.success(t("admin.store.image.uploadSuccess"));
          return;
        },
        onError: () => {
          toast.error(t("admin.store.image.uploadFail"));
          return;
        },
      }
    );
  };

  const onRemoveImage = (imageId: number) => {
    if (window.confirm(t("admin.common.deleteConfirm"))) {
      removeMutate(imageId, {
        onSuccess: () => {
          queryClient.invalidateQueries([...STORE_QUERY_KEYS.storeImages(selectedStore.id)]);
          toast.success(t("admin.store.image.deleteSuccess"));
          return;
        },
        onError: () => {
          toast.error(t("admin.store.image.deleteFail"));
          return;
        },
      });
    }
  };

  return (
    <CustomModal
      isOpen={isOpen}
      handleClose={onCloseModal}
      titleText={t("admin.store.image.title")}
      isLoading={isSaveLoading || isRemoveLoading}
      footerContents={
        <Button variant="contained" component="label">
          {t("admin.store.image.upload")}
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
              const isThumbnail = i === 0;
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
                            {t("admin.store.image.thumbnail")}
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
            {isLoading ? "Loading..." : isError ? "Server Error" : t("admin.store.image.empty")}
          </Typography>
        )}
      </div>
    </CustomModal>
  );
};

export default StoreImagesModal;
