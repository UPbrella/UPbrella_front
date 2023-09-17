import MypageAccountCard from "./index";
import { MypageAccountCardProps } from "./index";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "organisms/Mypage/MypageAccountCard",
  component: MypageAccountCard,
} as Meta<typeof MypageAccountCard>;

const Template: StoryFn<typeof MypageAccountCard> = (args: MypageAccountCardProps) => (
  <MypageAccountCard {...args} />
);

export const AccountCard = Template.bind({});
AccountCard.args = { hasBankAccountInfo: false, isInputCompleted: false };
