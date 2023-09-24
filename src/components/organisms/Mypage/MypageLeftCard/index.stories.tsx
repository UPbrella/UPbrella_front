import MypageLeftCard from "./index";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "organisms/Mypage/MypageLeftCard",
  component: MypageLeftCard,
} as Meta<typeof MypageLeftCard>;

const Template: StoryFn<typeof MypageLeftCard> = () => <MypageLeftCard />;

export const Left = Template.bind({});
Left.args = {};
