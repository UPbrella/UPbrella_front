import SignUpProgress from "./index";
import { SignUpProgressProps } from "./index";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "molecules/SignUp/SignUpProgress",
  component: SignUpProgress,
} as Meta<typeof SignUpProgress>;

const Template: StoryFn<typeof SignUpProgress> = (args: SignUpProgressProps) => (
  <SignUpProgress {...args} />
);

export const FirstPage = Template.bind({});
FirstPage.args = {
  isInProgress1: true,
  isInProgress2: false,
};
