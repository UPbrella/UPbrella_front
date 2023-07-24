import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import CustomModal from "@/components/organisms/Modal";
import { Button, Typography } from "@mui/material";

//
const meta: Meta<typeof CustomModal> = {
  title: "organisms/Modal",
  component: CustomModal,
};

export default meta;

//
type Story = StoryObj<typeof CustomModal>;

const ModalWithHook = () => {
  const [isOpen, setIsOpen] = useState(true);
  const handleClose = () => setIsOpen(false);

  return (
    <CustomModal
      titleText="Modal Test"
      isOpen={isOpen}
      handleClose={handleClose}
      footerContents={
        <Button autoFocus onClick={handleClose}>
          Save changes
        </Button>
      }
    >
      <>
        <Typography gutterBottom>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
          in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        </Typography>
        <Typography gutterBottom>
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus
          vel augue laoreet rutrum faucibus dolor auctor.
        </Typography>
        <Typography gutterBottom>
          Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
          scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
          auctor fringilla.
        </Typography>
      </>
    </CustomModal>
  );
};

export const Default: Story = {
  render: () => <ModalWithHook />,
};
