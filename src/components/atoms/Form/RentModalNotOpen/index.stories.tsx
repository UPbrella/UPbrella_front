import RentModalNotOpen from "./index";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "atoms/RentModalNotOpen",
  component: RentModalNotOpen,
} as Meta<typeof RentModalNotOpen>;

const Template: StoryFn<typeof RentModalNotOpen> = () => <RentModalNotOpen />;

export const Default = Template.bind({});
Default.args = {};
