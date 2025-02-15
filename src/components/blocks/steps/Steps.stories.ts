import Steps from './Steps.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
  title: 'Blocks/Steps',
  component: Steps,
  tags: ['autodocs'],
} satisfies Meta<typeof Steps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    count: 10,
    progress: 5,
  },
} satisfies Story;
