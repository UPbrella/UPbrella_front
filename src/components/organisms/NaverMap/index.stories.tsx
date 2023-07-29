import { StoryFn } from "@storybook/react";
import NaverMap from "@/components/organisms/NaverMap/index";

export default {
  title: "organisms/NaverMap",
  component: NaverMap,
};

const Template: StoryFn = (args) => <NaverMap {...args} />;

export const Default = Template.bind({});
Default.args = {};
