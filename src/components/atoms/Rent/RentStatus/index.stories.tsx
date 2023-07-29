import RentStatus from "./index";
import { RentStatusProps } from "./index";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "atoms/Rent/RentStatus",
  component: RentStatus,
} as Meta<typeof RentStatus>;

const Template: StoryFn<typeof RentStatus> = (args: RentStatusProps) => <RentStatus {...args} />;

export const Status = Template.bind({});
Status.args = {
  label: "상태신고",
  placeholder: "우산이나 대여 환경에 문제가 있다면 작성해주세요!",
};
