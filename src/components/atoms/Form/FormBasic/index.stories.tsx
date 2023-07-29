import FormBasic from "./index";
import { FormBasicProps } from "./index";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "atoms/Form/FormBasic",
  component: FormBasic,
} as Meta<typeof FormBasic>;

const Template: StoryFn<typeof FormBasic> = (args: FormBasicProps) => <FormBasic {...args} />;

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
