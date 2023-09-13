import MypageLeftCard from "./index";
import { MypageLeftCardProps } from "./index";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "organisms/Mypage/MypageLeftCard",
  component: MypageLeftCard,
} as Meta<typeof MypageLeftCard>;

const Template: StoryFn<typeof MypageLeftCard> = (args: MypageLeftCardProps) => (
  <MypageLeftCard {...args} />
);

export const Left = Template.bind({});
Left.args = {
  userName: "이연우",
  totalRentNum: 10,
  profileInfo: {
    umbrellaUuid: 0,
    rentedAt: "2024-08-01 (토) 18:38",
    rentedStore: "연세대학교 중앙도서관",
    returnedDue: "2023-08-14 (토)",
    returnAt: "-",
    returned: false,
    refunded: false,
  },
  isReturned: false,
};
