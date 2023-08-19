import { Meta, StoryFn } from "@storybook/react";
import Store, { TStore } from "@/components/molecules/Store/index";

export default {
  title: "molecules/Store",
  component: Store,
  tags: ["autodocs"],
} as Meta;

const Template: StoryFn<TStore> = (args) => <Store {...args} />;

export const Default = Template.bind({});
Default.args = { title: "모티스 스터디카페", category: ["카페", "디저트"] };
