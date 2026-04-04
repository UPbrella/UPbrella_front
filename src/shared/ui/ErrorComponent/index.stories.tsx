import type { Meta, StoryFn } from "@storybook/react";
import ErrorComponent, { TErrorComponent } from ".";

export default {
  title: "molecules/ErrorComponent",
  component: ErrorComponent,
  tags: ["autodocs"],
} as Meta;

const Template: StoryFn<TErrorComponent> = (args) => <ErrorComponent {...args} />;

export const Default = Template.bind({});
Default.args = {
  error: "죄송합니다. 일시적인 오류에요 :(",
  subError: "잠시 후에 다시 시도해주세요.",
};
