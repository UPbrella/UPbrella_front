import React from "react";
import { Story } from "@storybook/react";
import ImgSwiper from "src/components/organisms/ImgSwiper/index";

export default {
  title: "organisms/ImgSwiper",
  component: ImgSwiper,
};

const Template: Story = (args) => <ImgSwiper {...args} />;

export const Default = Template.bind({});
Default.args = {};
