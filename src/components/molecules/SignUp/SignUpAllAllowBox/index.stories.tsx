import SignUpAllAllowBox from "./index";
import { SignUpAllAllowBoxProps } from "./index";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "molecules/SignUp/SignUpAllAllowBox",
  component: SignUpAllAllowBox,
} as Meta<typeof SignUpAllAllowBox>;

const Template: StoryFn<typeof SignUpAllAllowBox> = (args: SignUpAllAllowBoxProps) => (
  <SignUpAllAllowBox {...args} />
);

export const AllRequired = Template.bind({});
AllRequired.args = {
  isAllow: false,
  label: "전체동의",
};
