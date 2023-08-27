import SignUpFormTitle from "./index";
import { SignUpFormTitleProps } from "./index";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "atoms/SignUp/SignUpFormTitle",
  component: SignUpFormTitle,
} as Meta<typeof SignUpFormTitle>;

const Template: StoryFn<typeof SignUpFormTitle> = (args: SignUpFormTitleProps) => (
  <SignUpFormTitle {...args} />
);

export const Title = Template.bind({});
Title.args = {
  label: "회원가입",
};
