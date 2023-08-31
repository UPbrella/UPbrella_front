import RentLocationMolecules from "./index";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "molecules/RentLocationMolecules",
  component: RentLocationMolecules,
} as Meta;

const Template: StoryFn = () => <RentLocationMolecules location="" storeName="" label="" />;

export const Default = Template.bind({});
