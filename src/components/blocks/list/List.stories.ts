import List from './List.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
  title: 'Blocks/List',
  component: List,
  tags: ['autodocs'],
} satisfies Meta<typeof List>;

export default meta;

type Story = StoryObj<typeof List>;

export const Default: Story = {
  render: (args) => ({
    components: { List },
    setup() {
      return { args };
    },
    template: `
    <List v-bind="args" style="background: 'var(--tgui-secondary-bg-color)'">
      <div>First element</div>
      <div>Second element</div>
      <div>Third element</div>
    </List>`,
  }),
  args: {},
};
