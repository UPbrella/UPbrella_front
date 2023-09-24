import MypageInfoCard from "./index";
import { MypageInfoCardProps } from "./index";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "organisms/Mypage/MypageInfoCard",
  component: MypageInfoCard,
} as Meta<typeof MypageInfoCard>;

const Template: StoryFn<typeof MypageInfoCard> = (args: MypageInfoCardProps) => (
  <MypageInfoCard {...args} />
);

export const Info = Template.bind({});
Info.args = { name: "이준석", phoneNumber: "010-1234-1234", email: "asdf@naver.com" };
