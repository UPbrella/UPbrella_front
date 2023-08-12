import SignUpFormButton from "./index";
import { SignUpFormButtonProps } from "./index";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "atoms/SignUp/SignUpFormButton",
  component: SignUpFormButton,
} as Meta<typeof SignUpFormButton>;

const Template: StoryFn<typeof SignUpFormButton> = (args: SignUpFormButtonProps) => (
  <SignUpFormButton {...args} />
);

export const DoneButtonNext = Template.bind({});
DoneButtonNext.args = {
  label: "다음",
  isDone: true,
};

export const DoneButtonSignUp = Template.bind({});
DoneButtonSignUp.args = {
  label: "가입하기!",
  isDone: true,
};

export const NotDoneButtonNext = Template.bind({});
NotDoneButtonNext.args = {
  label: "다음",
  isDone: false,
};

export const NotDoneButtonSignUp = Template.bind({});
NotDoneButtonSignUp.args = {
  label: "가입하기!",
  isDone: false,
};
