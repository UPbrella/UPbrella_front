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

export const RefundAccount = Template.bind({});
RefundAccount.args = {
  label: "은행명",
};
