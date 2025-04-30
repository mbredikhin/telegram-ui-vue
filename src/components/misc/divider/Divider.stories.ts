import { Cell, List } from '@/components/blocks';
import Divider from './Divider.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
  title: 'Misc/Divider',
  component: Divider,
  tags: ['autodocs'],
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  render: (args) => ({
    components: { Divider, List, Cell },
    setup() {
      return { args };
    },
    template: `
      <List style="padding: 16px; background: var(--tgui-secondary-bg-color)">
        <div style="background: var(--tgui-bg-color)">
          <Cell>Divider is under</Cell>
          <Divider v-bind="args" />
          <Cell>Divider is above</Cell>
        </div>
      </List>`,
  }),
  args: {},
};
