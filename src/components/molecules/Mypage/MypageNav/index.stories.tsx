import MypageNav from "./index";
import { MypageNavProps } from "./index";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "molecules/Mypage/MypageNav",
  component: MypageNav,
} as Meta<typeof MypageNav>;

const Template: StoryFn<typeof MypageNav> = (args: MypageNavProps) => <MypageNav {...args} />;

export const Nav = Template.bind({});
Nav.args = {
  isClick: false,
};
