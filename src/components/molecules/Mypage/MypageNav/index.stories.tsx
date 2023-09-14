import MypageNav from "./index";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "molecules/Mypage/MypageNav",
  component: MypageNav,
} as Meta<typeof MypageNav>;

const Template: StoryFn<typeof MypageNav> = () => <MypageNav />;

export const Nav = Template.bind({});
