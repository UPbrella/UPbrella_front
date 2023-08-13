import { Meta, StoryFn } from "@storybook/react";
import MapBtn from ".";

export default {
  title: "molecules/MapBtn",
  component: MapBtn,
  tags: ["autodocs"],
} as Meta;

const Template: StoryFn = (args) => <MapBtn {...args} />;

export const Default = Template.bind({});
Default.args = { text: ["신촌", "연희동"] };
