import MypageBankInput from "./index";
import { MypageBankInputProps } from "./index";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "atoms/Mypage/MypageBankInput",
  component: MypageBankInput,
} as Meta<typeof MypageBankInput>;

const Template: StoryFn<typeof MypageBankInput> = (args: MypageBankInputProps) => (
  <MypageBankInput {...args} />
);

export const BankInput = Template.bind({});
BankInput.args = {
  label: "은행명",
};
