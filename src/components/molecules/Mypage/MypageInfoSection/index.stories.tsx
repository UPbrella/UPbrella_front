import MypageInfoSection from "./index";
import { MypageInfoSectionProps } from "./index";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "molecules/Mypage/MypageInfoSection",
  component: MypageInfoSection,
} as Meta<typeof MypageInfoSection>;

const Template: StoryFn<typeof MypageInfoSection> = (args: MypageInfoSectionProps) => (
  <MypageInfoSection {...args} />
);

export const Info = Template.bind({});
Info.args = { name: "이준석", phoneNumber: "010-1234-1234", email: "asdf@naver.com" };
