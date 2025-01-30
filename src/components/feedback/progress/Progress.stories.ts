import Progress from './Progress.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
  title: 'Feedback/Progress',
  component: Progress,
  tags: ['autodocs'],
} satisfies Meta<typeof Progress>;

export default meta;

type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  render: (args) => ({
    components: { Progress },
    setup() {
      return { args };
    },
    template: '<Progress v-bind="args" />',
  }),
  args: {
    value: 50,
  },
};
