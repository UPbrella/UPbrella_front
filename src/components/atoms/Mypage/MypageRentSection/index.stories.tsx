import MypageRentSection from "./index";
import { MypageRentSectionProps } from "./index";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "atoms/Mypage/MypageRentSection",
  component: MypageRentSection,
} as Meta<typeof MypageRentSection>;

const Template: StoryFn<typeof MypageRentSection> = (args: MypageRentSectionProps) => (
  <MypageRentSection {...args} />
);

export const RentSection = Template.bind({});
RentSection.args = {
  rentInfo: {
    umbrellaUuid: 0,
    rentedAt: "2024-08-01 (토) 18:38",
    rentedStore: "연세대학교 중앙도서관",
    returnedDue: "2023-08-14 (토)",
    returnAt: "-",
    returned: false,
    refunded: false,
  },
};
