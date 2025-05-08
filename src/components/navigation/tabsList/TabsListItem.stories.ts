import type { Meta, StoryObj } from '@storybook/vue3';
import TabsListItem from './TabsListItem.vue';

const meta = {
  title: 'Navigation/TabsList/TabsListItem',
  component: TabsListItem,
  tags: ['autodocs'],
} satisfies Meta<typeof TabsListItem>;

export default meta;

type Story = StoryObj<typeof TabsListItem>;

export const Default: Story = {
  render: (args) => ({
    components: { TabsListItem },
    setup() {
      return { args };
    },
    template: `
    <TabsListItem v-bind="args">
      This is a TabsListItem
    </TabsListItem>`,
  }),
  args: {
    selected: false,
  },
};
