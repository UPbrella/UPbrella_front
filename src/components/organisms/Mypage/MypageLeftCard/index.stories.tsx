import { TRentHistoriesRes } from "@/api/clientUserApi";
import { Meta, StoryFn } from "@storybook/react";
import MypageLeftCard from "./index";

export default {
  title: "organisms/Mypage/MypageLeftCard",
  component: MypageLeftCard,
} as Meta<typeof MypageLeftCard>;

const Template: StoryFn<typeof MypageLeftCard> = (args: { rentList: TRentHistoriesRes[] }) => (
  <MypageLeftCard {...args} />
);

export const Left = Template.bind({});
Left.args = {
  rentList: [
    {
      umbrellaUuid: 1,
      rentedAt: "2024-08-01 (토) 18:38",
      rentedStore: "연세대학교 중앙도서관",
      returnAt: "2024-08-02 (일) 10:15",
      isReturned: true,
      isRefunded: false,
    },
  ],
};
