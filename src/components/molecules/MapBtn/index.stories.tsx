import { Meta, StoryFn } from "@storybook/react";
import MapBtn, { MapBtnProps } from "@/components/molecules/MapBtn/index";

export default {
  title: "molecules/MapBtn",
  component: MapBtn,
  tags: ["autodocs"],
} as Meta;

const Template: StoryFn<MapBtnProps> = (args) => <MapBtn {...args} />;
export const Default = Template.bind({});
