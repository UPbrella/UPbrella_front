import SignUpAllowBox from "./index";
import { SignUpAllowBoxProps } from "./index";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "molecules/SignUp/SignUpAllowBox",
  component: SignUpAllowBox,
} as Meta<typeof SignUpAllowBox>;

const Template: StoryFn<typeof SignUpAllowBox> = (args: SignUpAllowBoxProps) => (
  <SignUpAllowBox {...args} />
);

export const Required = Template.bind({});
Required.args = {
  isAllow: false,
  label: "(필수) 업브렐라 이용약관",
};
