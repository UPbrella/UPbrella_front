import SignUpFormInputTitle from "./index";
import { SignUpFormInputTitleProps } from "./index";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "atoms/SignUp/SignUpFormInputTitle",
  component: SignUpFormInputTitle,
} as Meta<typeof SignUpFormInputTitle>;

const Template: StoryFn<typeof SignUpFormInputTitle> = (args: SignUpFormInputTitleProps) => (
  <SignUpFormInputTitle {...args} />
);

export const Name = Template.bind({});
Name.args = {
  label: "이름",
};

export const PhoneNumber = Template.bind({});
PhoneNumber.args = {
  label: "전화번호",
};

export const RefundAccount = Template.bind({});
RefundAccount.args = {
  label: "환급받을 계좌",
  isRequired: true,
};
