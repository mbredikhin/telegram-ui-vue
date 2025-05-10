import Steps from './Steps.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
  title: 'Blocks/Steps',
  component: Steps,
  tags: ['autodocs'],
  argTypes: {
    count: {
      type: 'number',
      description: 'Total number of steps.',
    },
    progress: {
      type: 'number',
      description:
        'Current progress, indicating how many steps have been completed. Progress is 0-indexed and goes up to `count`.',
    },
  },
} satisfies Meta<typeof Steps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    count: 10,
    progress: 5,
  },
} satisfies Story;
