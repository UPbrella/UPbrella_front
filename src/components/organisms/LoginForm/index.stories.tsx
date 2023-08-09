import LoginForm from "@/components/organisms/LoginForm";
import { LoginFormProps } from "@/components/organisms/LoginForm";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "organisms/LoginForm",
  component: LoginForm,
} as Meta<typeof LoginForm>;

const Template: StoryFn<typeof LoginForm> = (args: LoginFormProps) => <LoginForm {...args} />;

export const Form = Template.bind({});
Form.args = {};
