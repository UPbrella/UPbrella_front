import ProfileName from "./index";
import { ProfileNameProps } from "./index";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "atoms/Mypage/ProfileName",
  component: ProfileName,
} as Meta<typeof ProfileName>;

const Template: StoryFn<typeof ProfileName> = (args: ProfileNameProps) => <ProfileName {...args} />;

export const Profile = Template.bind({});
Profile.args = {
  userName: "이연우",
  totalRentNum: 10,
};
