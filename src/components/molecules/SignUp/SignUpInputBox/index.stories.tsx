import SignUpInputBox from "./index";
import { SignUpInputBoxProps } from "./index";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "molecules/SignUp/SignUpInputBox",
  component: SignUpInputBox,
} as Meta<typeof SignUpInputBox>;

const Template: StoryFn<typeof SignUpInputBox> = (args: SignUpInputBoxProps) => (
  <SignUpInputBox {...args} />
);

export const Name = Template.bind({});
Name.args = {
  labelTitle: "이름",
  labelInput: "이름 입력",
  name: "name",
};

export const PhoneNumber = Template.bind({});
PhoneNumber.args = {
  labelTitle: "전화번호",
  labelInput: "010-1234-5678",
  name: "number",
};

export const RefundAccount = Template.bind({});
RefundAccount.args = {
  labelTitle: "환급받을 계좌",
  isRequired: true,
  labelInput: "계좌번호",
  name: "refundaccount",
};
