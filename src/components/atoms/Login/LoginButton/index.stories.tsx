import LoginButton from "./index";
import { LoginButtonProps } from "./index";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "atoms/Login/LoginButton",
  component: LoginButton,
} as Meta<typeof LoginButton>;

const Template: StoryFn<typeof LoginButton> = (args: LoginButtonProps) => <LoginButton {...args} />;

export const Login = Template.bind({});
Login.args = {
  label: "카카오로 3초 만에 시작하기",
};
