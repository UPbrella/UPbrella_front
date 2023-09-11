import MypageNavSection from "./index";
import { MypageNavSectionProps } from "./index";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "atoms/Mypage/MypageNavSection",
  component: MypageNavSection,
} as Meta<typeof MypageNavSection>;

const Template: StoryFn<typeof MypageNavSection> = (args: MypageNavSectionProps) => (
  <MypageNavSection {...args} />
);

export const Nav = Template.bind({});
Nav.args = {
  navName: "이용내역",
  isClick: true,
};
