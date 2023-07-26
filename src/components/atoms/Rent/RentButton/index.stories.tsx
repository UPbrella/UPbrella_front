import RentButton from "./index";
import { RentButtonProps } from "./index";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "atoms/Rent/RentButton",
  component: RentButton,
} as Meta<typeof RentButton>;

const Template: StoryFn<typeof RentButton> = (args: RentButtonProps) => <RentButton {...args} />;

export const Rent = Template.bind({});
Rent.args = {
  label: "대여하기",
};
