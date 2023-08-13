import { Meta, StoryFn } from "@storybook/react";
import MapBtn from ".";

export default {
  title: "molecules/MapBtn",
  component: MapBtn,
  tags: ["autodocs"],
} as Meta;

const Template: StoryFn = (args) => <MapBtn {...args} />;


