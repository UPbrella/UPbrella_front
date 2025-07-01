import { TRentHistoriesRes } from "@/api/clientUserApi";
import { Meta, StoryFn } from "@storybook/react";
import MypageRentList from "./index";

export default {
  title: "molecules/Mypage/MypageRentList",
  component: MypageRentList,
} as Meta<typeof MypageRentList>;

const Template: StoryFn<typeof MypageRentList> = (args: { rentList: TRentHistoriesRes[] }) => (
  <MypageRentList {...args} />
);

export const RentList = Template.bind({});
RentList.args = {
  rentList: [
    {
      umbrellaUuid: 937,
      rentedAt: "2022-10-04 22:43:23",
      rentedStore: "커피나무",
      returnAt: "2024-04-11 23:23:16",
      isReturned: true,
      isRefunded: false,
    },
    {
      umbrellaUuid: 587,
      rentedAt: "2023-06-24 10:15:13",
      rentedStore: "커피나무",
      returnAt: "2023-08-13 07:21:17",
      isReturned: false,
      isRefunded: false,
    },
    {
      umbrellaUuid: 365,
      rentedAt: "2024-02-21 13:37:14",
      rentedStore: "커피빈",
      returnAt: "2023-07-31 10:22:21",
      isReturned: true,
      isRefunded: false,
    },
    {
      umbrellaUuid: 588,
      rentedAt: "2022-11-11 19:03:33",
      rentedStore: "커피빈",
      returnAt: "2024-03-15 16:24:09",
      isReturned: true,
      isRefunded: false,
    },
    {
      umbrellaUuid: 847,
      rentedAt: "2023-11-20 02:28:20",
      rentedStore: "커피나무",
      returnAt: "2023-03-31 07:53:11",
      isReturned: true,
      isRefunded: false,
    },
  ],
};
