import SignUpFormAllAllowText from "./index";
import { SignUpFormAllAllowTextProps } from "./index";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "atoms/SignUp/SignUpFormAllAllowText",
  component: SignUpFormAllAllowText,
} as Meta<typeof SignUpFormAllAllowText>;

const Template: StoryFn<typeof SignUpFormAllAllowText> = (args: SignUpFormAllAllowTextProps) => (
  <SignUpFormAllAllowText {...args} />
);

export const AllAlow = Template.bind({});
AllAlow.args = {
  label: "전체동의",
};
