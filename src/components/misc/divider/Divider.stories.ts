import { List } from '@/components/blocks';
import Divider from './Divider.vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { Text } from '@/components/typography';

const meta = {
  title: 'Misc/Divider',
  component: Divider,
  tags: ['autodocs'],
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  render: (args) => ({
    components: { Divider, List, Text },
    setup() {
      return { args };
    },
    template: `
      <List style="padding: 16, background: var(--tgui-secondary-bg-color)'">
        <div style="background: var(--tgui-bg-color)">
          <Text>Divider is under</Text>
          <Divider v-bind="args" />
          <Text>Divider is above</Text>
        </div>
      </List>`,
  }),
  args: {},
};
