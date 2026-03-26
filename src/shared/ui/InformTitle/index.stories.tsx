import { Meta, StoryFn } from "@storybook/react";

import InformTitle, { TInformTitle } from ".";

export default {
  title: "atoms/InformTitle",
  component: InformTitle,
  tags: ["autodocs"],
} as Meta;

const Template: StoryFn<TInformTitle> = (args) => <InformTitle {...args} />;

export const Default = Template.bind({});
Default.args = { stepTitle: "step 1", title: "가까운 협업 지점 방문하기" };
