import SignUpText from "./index";
import { SignUpTextProps } from "./index";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "molecules/SignUp/SignUpText",
  component: SignUpText,
} as Meta<typeof SignUpText>;

const Template: StoryFn<typeof SignUpText> = (args: SignUpTextProps) => <SignUpText {...args} />;

export const Required = Template.bind({});
Required.args = {
  labelTitle: "이름과 전화번호를 입력해주세요!",
  labelSubtitle1: "수집된 개인정보는",
  labelSubtitle2: "사용됩니다.",
  labelSubtitleBold: "서비스 운영의 목적으로만",
};

export const NotRequired = Template.bind({});
NotRequired.args = {
  labelTitle: "환급받을 계좌를 입력해주세요!",
  labelSubtitle1: `지금 한 번 입력해두면 반납할 땐 자동 입력됩니다 :)`,
  labelSubtitleNextLine: " 선택사항이니 그냥 넘어가도 좋아요!",
};
