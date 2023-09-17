import MypageFormTitle from "./index";
import { MypageFormTitleProps } from "./index";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "atoms/Mypage/MypageFormTitle",
  component: MypageFormTitle,
} as Meta<typeof MypageFormTitle>;

const Template: StoryFn<typeof MypageFormTitle> = (args: MypageFormTitleProps) => (
  <MypageFormTitle {...args} />
);

export const FormTitle = Template.bind({});
FormTitle.args = { label: "은행" };
