import { Meta, StoryFn } from "@storybook/react";
import Store, { TStoreProps } from "@/components/molecules/Store/index";

export default {
  title: "molecules/Store",
  component: Store,
  tags: ["autodocs"],
} as Meta;

const Template: StoryFn<TStoreProps> = (args) => <Store {...args} />;

export const Default = Template.bind({});

Default.args = {
  storeList: [
    {
      subClassificationId: 1,
      stores: [
        {
          id: 1,
          thumbnail:
            "https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F275666475594CA3102",
          name: "ㅇㅇ",
          category: "ㅇㅇ",
        },
        {
          id: 2,
          thumbnail:
            "https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F275666475594CA3102",
          name: "ㅇㅇ",
          category: "ㅇㅇ",
        },
      ],
    },
  ],
};
