import { DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type TProps = {
  titleText: string;
  handleClose?: () => void;
};

// Modal Header
const CustomModalHeader = ({ titleText, handleClose }: TProps) => {
  return (
    <DialogTitle>
      {titleText}
      {handleClose ? (
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default CustomModalHeader;
