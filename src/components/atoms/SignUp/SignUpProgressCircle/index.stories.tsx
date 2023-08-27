import SignUpProgressCircle from "./index";
import { SignUpProgressCircleProps } from "./index";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "atoms/SignUp/SignUpProgressCircle",
  component: SignUpProgressCircle,
} as Meta<typeof SignUpProgressCircle>;

const Template: StoryFn<typeof SignUpProgressCircle> = (args: SignUpProgressCircleProps) => (
  <SignUpProgressCircle {...args} />
);

export const InProgress = Template.bind({});
InProgress.args = {
  isInProgress: true,
};
