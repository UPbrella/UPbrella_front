import { Meta, StoryFn } from "@storybook/react";
import LocationClassificationBtn, {
  TLocationClassificationBtn,
} from "@/components/atoms/LocationClassificationBtn/index";

export default {
  title: "atoms/LocationClassificationBtn",
  component: LocationClassificationBtn,
  tags: ["autodocs"],
} as Meta;

const Template: StoryFn<TLocationClassificationBtn> = (args) => (
  <LocationClassificationBtn {...args} />
);

export const Default = Template.bind({});
// Default.args = { text: ["신촌", "연희동"] };
