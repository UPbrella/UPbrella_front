import SignUpFormInput from "./index";
import { SignUpFormInputProps } from "./index";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "atoms/SignUp/SignUpFormInput",
  component: SignUpFormInput,
} as Meta<typeof SignUpFormInput>;

const Template: StoryFn<typeof SignUpFormInput> = (args: SignUpFormInputProps) => (
  <SignUpFormInput {...args} />
);

export const Name = Template.bind({});
Name.args = {
  label: "이름 입력",
  name: "name",
};

export const PhoneNumber = Template.bind({});
PhoneNumber.args = {
  label: "010-1234-5678",
  name: "number",
};

export const RefundAccount = Template.bind({});
RefundAccount.args = {
  label: "계좌번호",
  name: "refundaccount",
};
