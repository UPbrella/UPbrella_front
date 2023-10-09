import { StoryFn } from "@storybook/react";
import ImgSwiper, { TImgSwiper } from "@/components/organisms/ImgSwiper/index";

export default {
  title: "organisms/ImgSwiper",
  component: ImgSwiper,
};

const Template: StoryFn<TImgSwiper> = (args) => <ImgSwiper {...args} />;

export const Default = Template.bind({});
Default.args = {};
