import { StoryFn } from "@storybook/react";
import RentalInfoCard from "@/components/organisms/RentalInfoCard/index";

export default {
  title: "organisms/RentalInfoCard",
  component: RentalInfoCard,
  tags: ["autodocs"],
};

const Template: StoryFn = (args) => <RentalInfoCard {...args} />;

export const Default = Template.bind({});
Default.args = {};
