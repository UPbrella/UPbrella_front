import SignUpFormInputBankName from "./index";
import { SignUpFormInputBankNameProps } from "./index";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "atoms/SignUp/SignUpInputBankName",
  component: SignUpFormInputBankName,
} as Meta<typeof SignUpFormInputBankName>;

const Template: StoryFn<typeof SignUpFormInputBankName> = (args: SignUpFormInputBankNameProps) => (
  <SignUpFormInputBankName {...args} />
);

export const Name = Template.bind({});
Name.args = {
  label: "이름 입력",
};

export const PhoneNumber = Template.bind({});
PhoneNumber.args = {
  label: "010-1234-5678",
};

export const RefundAccount = Template.bind({});
RefundAccount.args = {
  label: "계좌번호",
};
