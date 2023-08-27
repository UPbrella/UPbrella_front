import SignUpFormSubTitle from "./index";
import { SignUpFormSubTitleProps } from "./index";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "atoms/SignUp/SignUpFormSubTitle",
  component: SignUpFormSubTitle,
} as Meta<typeof SignUpFormSubTitle>;

const Template: StoryFn<typeof SignUpFormSubTitle> = (args: SignUpFormSubTitleProps) => (
  <SignUpFormSubTitle {...args} />
);

export const InfoMessage = Template.bind({});
InfoMessage.args = {
  label1: "수집된 개인정보는",
  labelBold: "서비스 운영의 목적으로만",
  label2: "사용됩니다.",
};
