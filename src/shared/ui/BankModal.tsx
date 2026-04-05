import { CSSProperties, ReactNode } from "react";
import { Dialog, DialogActions, DialogContent } from "@mui/material";
import { DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type TProps = {
  titleText: string;
  isOpen: boolean;
  handleClose: () => void;
  children: ReactNode;
  footerContents?: ReactNode;
  isLoading?: boolean;
};

// Modal Organism
const BankModal = ({
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
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            borderRadius: "20px",
            width: "100%",
            maxWidth: "520px",
            padding: "32px",
          },
        },
      }}
      onClose={handleClose}
      open={isOpen}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          fontSize: "24px",
        }}
      >
        {titleText}
        {handleClose ? (
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 32,
              top: 32,
              color: "#1C1B1F",
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>

      {/* Body Contents */}
      <DialogContent>{children}</DialogContent>

      {/* Footer Contents */}
      <DialogActions>{footerContents}</DialogActions>
    </Dialog>
  );
};

export default BankModal;
