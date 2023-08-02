import LoginTitle from "./index";
import { LoginTitleProps } from "./index";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "atoms/Login/LoginTitle",
  component: LoginTitle,
} as Meta<typeof LoginTitle>;

const Template: StoryFn<typeof LoginTitle> = (args: LoginTitleProps) => <LoginTitle {...args} />;

export const Title = Template.bind({});
Title.args = {
  label: "로그인",
};
