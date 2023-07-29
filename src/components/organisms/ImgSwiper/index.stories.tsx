import { StoryFn } from "@storybook/react";
import ImgSwiper from "@/components/organisms/ImgSwiper/index";

export default {
  title: "organisms/ImgSwiper",
  component: ImgSwiper,
};

const Template: StoryFn = (args) => <ImgSwiper {...args} />;

export const Default = Template.bind({});
Default.args = {};
