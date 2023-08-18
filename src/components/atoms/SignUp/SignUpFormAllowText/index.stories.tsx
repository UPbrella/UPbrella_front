import SignUpFormAllowText from "./index";
import { SignUpFormAllowTextProps } from "./index";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "atoms/SignUp/SignUpFormAllowText",
  component: SignUpFormAllowText,
} as Meta<typeof SignUpFormAllowText>;

const Template: StoryFn<typeof SignUpFormAllowText> = (args: SignUpFormAllowTextProps) => (
  <SignUpFormAllowText {...args} />
);

export const UseInfo = Template.bind({});
UseInfo.args = {
  label: "(필수) 업브렐라 이용약관",
};

export const InfoAllow = Template.bind({});
InfoAllow.args = {
  label: "(필수) 개인정보 수집 및 이용동의",
};
