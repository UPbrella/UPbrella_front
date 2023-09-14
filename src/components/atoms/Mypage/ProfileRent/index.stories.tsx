import ProfileRent from "./index";
import { ProfileRentProps } from "./index";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "atoms/Mypage/ProfileRent",
  component: ProfileRent,
} as Meta<typeof ProfileRent>;

const Template: StoryFn<typeof ProfileRent> = (args: ProfileRentProps) => <ProfileRent {...args} />;

export const Profile = Template.bind({});
Profile.args = {
  profileInfo: {
    umbrellaUuid: 0,
    rentedAt: "2024-08-01 (토) 18:38",
    rentedStore: "연세대학교 중앙도서관",
    returnedDue: "2023-08-14 (토)",
    returnAt: "-",
    returned: false,
    refunded: false,
  },
};
