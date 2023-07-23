import RentBasic from "./index";
import { RentBasicProps } from "./index";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "atoms/Rent/RentBasic",
  component: RentBasic,
} as Meta<typeof RentBasic>;

const Template: StoryFn<typeof RentBasic> = (args: RentBasicProps) => <RentBasic {...args} />;

export const No = Template.bind({});
No.args = {
  label: "우산번호",
  isRequired: false,
};

export const Condition = Template.bind({});
Condition.args = {
  label: "상태신고",
  placeholder: "우산이나 대여 환경에 문제가 있다면 작성해주세요!",
  isRequired: true,
};
