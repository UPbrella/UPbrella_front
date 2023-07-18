import { Meta, Story } from "@storybook/react";

import { TRentalLocationTitle } from "@/types/label/RentalLocationTitleTypes";
import RentalLocationTitle from ".";

export default {
  title: "Example/RentalLocationTitle",
  component: RentalLocationTitle,
} as Meta;

const Template: Story<TRentalLocationTitle> = (args) => <RentalLocationTitle {...args} />;

export const Default = Template.bind({});
Default.args = { title: "모티스 스터디카페", category: ["카페", "디저트"] };
