import MypageRentList from "./index";
import { MypageRentListProps } from "./index";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "molecules/Mypage/MypageRentList",
  component: MypageRentList,
} as Meta<typeof MypageRentList>;

const Template: StoryFn<typeof MypageRentList> = (args: MypageRentListProps) => (
  <MypageRentList {...args} />
);

export const RentList = Template.bind({});
RentList.args = {
  rentList: [
    {
      umbrellaUuid: 937,
      rentedAt: "2022-10-04 22:43:23",
      rentedStore: "커피나무",
      returnedDue: "2023-08-14 (토)", //TODO: returnedDue는 계산값넣어야
      returnAt: "2024-04-11 23:23:16",
      refunded: false,
      returned: true,
    },
    {
      umbrellaUuid: 587,
      rentedAt: "2023-06-24 10:15:13",
      rentedStore: "커피나무",
      returnedDue: "2023-08-14 (토)",
      returnAt: "2023-08-13 07:21:17",
      refunded: false,
      returned: false,
    },
    {
      umbrellaUuid: 365,
      rentedAt: "2024-02-21 13:37:14",
      rentedStore: "커피빈",
      returnedDue: "2023-08-14 (토)",
      returnAt: "2023-07-31 10:22:21",
      refunded: false,
      returned: true,
    },
    {
      umbrellaUuid: 588,
      rentedAt: "2022-11-11 19:03:33",
      rentedStore: "커피빈",
      returnedDue: "2023-08-14 (토)",
      returnAt: "2024-03-15 16:24:09",
      refunded: false,
      returned: true,
    },
    {
      umbrellaUuid: 847,
      rentedAt: "2023-11-20 02:28:20",
      rentedStore: "커피나무",
      returnedDue: "2023-08-14 (토)",
      returnAt: "2023-03-31 07:53:11",
      refunded: false,
      returned: true,
    },
  ],
};
