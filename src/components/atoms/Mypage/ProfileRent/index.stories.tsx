import { Meta, StoryFn } from "@storybook/react";
import ProfileRent, { ProfileRentProps } from "./index";

export default {
  title: "atoms/Mypage/ProfileRent",
  component: ProfileRent,
} as Meta<typeof ProfileRent>;

const Template: StoryFn<typeof ProfileRent> = (args: ProfileRentProps) => <ProfileRent {...args} />;

export const Profile = Template.bind({});
Profile.args = {
  currentRentInfo: {
    umbrellaUuid: 0,
    rentedAt: "2024-08-01 (토) 18:38",
    rentedStore: "연세대학교 중앙도서관",
    returnAt: "-",
    isReturned: false,
    isRefunded: false,
  },
};
