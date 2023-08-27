import { CSSProperties, ReactNode } from "react";
import { Dialog, DialogActions, DialogContent } from "@mui/material";
import CustomModalHeader from "@/components/molecules/ModalHeader";

type TProps = {
  titleText: string;
  isOpen: boolean;
  handleClose: () => void;
  children: ReactNode;
  footerContents?: ReactNode;
  isLoading?: boolean;
};

// Modal Organism
const CustomModal = ({
  titleText,
  isOpen,
  handleClose,
  children,
  footerContents,
  isLoading,
}: TProps) => {
  // hack
  const isLoadingStyle = { pointerEvents: "none", opacity: "0.6" } satisfies CSSProperties;

  return (
    <Dialog
      style={isLoading ? isLoadingStyle : {}}
      maxWidth="xl"
      onClose={handleClose}
      open={isOpen}
    >
      {/* Header */}
      <CustomModalHeader titleText={titleText} handleClose={handleClose} />

      {/* Body Contents */}
      <DialogContent dividers>{children}</DialogContent>

      {/* Footer Contents */}
      <DialogActions>{footerContents}</DialogActions>
    </Dialog>
  );
};

export default CustomModal;
