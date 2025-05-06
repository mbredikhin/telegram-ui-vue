import type { Meta, StoryObj } from '@storybook/vue3';
import Devices28Icon from '@/icons/28/devices.svg';
import TabbarItem from './TabbarItem.vue';
import { Component } from 'vue';

const meta = {
  title: 'Layout/Tabbar/TabbarItem',
  component: TabbarItem,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof TabbarItem>;

export default meta;

type Story = StoryObj<typeof TabbarItem>;

export const Default: Story = {
  render: (args) => ({
    components: {
      TabbarItem,
      Devices28Icon: Devices28Icon as unknown as Component,
    },
    setup() {
      return { args };
    },
    template: `
    <TabbarItem>
      <template #text>Hello</template>
      <Devices28Icon />
    </TabbarItem>`,
  }),
  args: {},
};
