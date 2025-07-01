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
Left.args = {};
