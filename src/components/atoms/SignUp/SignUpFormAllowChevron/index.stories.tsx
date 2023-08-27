import SignUpFormAllowChevron from "./index";
import { SignUpFormAllowChevronProps } from "./index";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "atoms/SignUp/SignUpFormAllowChevron",
  component: SignUpFormAllowChevron,
} as Meta<typeof SignUpFormAllowChevron>;

const Template: StoryFn<typeof SignUpFormAllowChevron> = (args: SignUpFormAllowChevronProps) => (
  <SignUpFormAllowChevron {...args} />
);

export const Clicked = Template.bind({});
Clicked.args = {
  isClicked: true,
};

export const NotClicked = Template.bind({});
NotClicked.args = {
  isClicked: false,
};
