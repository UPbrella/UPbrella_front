import MypageBankAccountInput from "./index";
import { MypageBankAccountInputProps } from "./index";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "molecules/Mypage/MypageBankAccountInput",
  component: MypageBankAccountInput,
} as Meta<typeof MypageBankAccountInput>;

const Template: StoryFn<typeof MypageBankAccountInput> = (args: MypageBankAccountInputProps) => (
  <MypageBankAccountInput {...args} />
);

export const BankAccountInput = Template.bind({});
BankAccountInput.args = {};
