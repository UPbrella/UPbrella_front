import { useState } from "react";

// modal 제어 hook
const useModalStatus = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => setIsOpen(false);

  return {
    isOpen,
    handleOpen,
    handleClose,
  };
};

export default useModalStatus;
