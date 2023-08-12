import SignUpFormAllow from "./index";
import { SignUpFormAllowProps } from "./index";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "atoms/SignUp/SignUpFormAllow",
  component: SignUpFormAllow,
} as Meta<typeof SignUpFormAllow>;

const Template: StoryFn<typeof SignUpFormAllow> = (args: SignUpFormAllowProps) => (
  <SignUpFormAllow {...args} />
);

export const Allow = Template.bind({});
Allow.args = {
  isAllow: true,
};

export const NotAllow = Template.bind({});
NotAllow.args = {
  isAllow: false,
};
