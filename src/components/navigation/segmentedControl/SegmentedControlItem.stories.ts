import type { Meta, StoryObj } from '@storybook/vue3';
import SegmentedControlItem from './SegmentedControlItem.vue';

const meta = {
  title: 'Navigation/SegmentedControl/SegmentedControlItem',
  component: SegmentedControlItem,
  tags: ['autodocs'],
  parameters: {
    controls: { include: ['selected'] },
  },
  argTypes: {
    selected: {
      type: 'boolean',
      description:
        'Whether the item is selected. Used by the parent SegmentedControl to style accordingly.',
    },
  },
} satisfies Meta<typeof SegmentedControlItem>;

export default meta;

type Story = StoryObj<typeof SegmentedControlItem>;

export const Default: Story = {
  render: (args) => ({
    components: { SegmentedControlItem },
    setup() {
      return { args };
    },
    template: `
    <SegmentedControlItem v-bind="args">
      This is a SegmentedControlItem
    </SegmentedControlItem>`,
  }),
  args: {
    selected: true,
  },
};
