import FormStatus from "./index";
import { FormStatusProps } from "./index";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "atoms/Form/FormStatus",
  component: FormStatus,
} as Meta<typeof FormStatus>;

const Template: StoryFn<typeof FormStatus> = (args: FormStatusProps) => <FormStatus {...args} />;

export const Status = Template.bind({});
Status.args = {
  label: "상태신고",
  placeholder: "우산이나 대여 환경에 문제가 있다면 작성해주세요!",
};

export const Request = Template.bind({});
Request.args = {
  label: "개선 요청 사항",
  placeholder: "개선이 필요하다고 느낀 점이 있다면 작성해주세요!",
};
