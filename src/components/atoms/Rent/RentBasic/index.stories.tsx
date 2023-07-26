import RentBasic from "./index";
import { RentBasicProps } from "./index";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "atoms/Rent/RentBasic",
  component: RentBasic,
} as Meta<typeof RentBasic>;

const Template: StoryFn<typeof RentBasic> = (args: RentBasicProps) => <RentBasic {...args} />;

// 이름, 전화번호, 우산번호는 자동으로 입력되는 값이라 placeholder 작성하지 않았습니다.
export const Name = Template.bind({});
Name.args = {
  label: "이름",
};

export const Phone = Template.bind({});
Phone.args = {
  label: "전화번호",
};

export const No = Template.bind({});
No.args = {
  label: "우산번호",
};
