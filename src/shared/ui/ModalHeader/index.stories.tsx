import CustomModalHeader from "@/shared/ui/ModalHeader";
import { Meta, StoryObj } from "@storybook/react";

//
const meta: Meta<typeof CustomModalHeader> = {
  title: "molecules/ModalHeader",
  component: CustomModalHeader,
};

export default meta;

//
type Story = StoryObj<typeof CustomModalHeader>;

export const Default: Story = {
  args: {
    titleText: "Modal Header",
    handleClose: () => {
      return;
    },
  },
};
