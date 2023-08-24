import SignUpInputAccountBox from "./index";
import { SignUpInputAccountBoxProps } from "./index";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "molecules/SignUp/SignUpInputAccountBox",
  component: SignUpInputAccountBox,
} as Meta<typeof SignUpInputAccountBox>;

const Template: StoryFn<typeof SignUpInputAccountBox> = (args: SignUpInputAccountBoxProps) => (
  <SignUpInputAccountBox {...args} />
);

export const Account = Template.bind({});
Account.args = {
  labelTitle: "환급받을 계좌",
  labelInput: "계좌번호",
  name: "account",
};
