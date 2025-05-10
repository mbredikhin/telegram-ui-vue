import Progress from './Progress.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
  title: 'Feedback/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    value: {
      type: 'number',
      description:
        'The current value of the progress bar, expressed as a percentage. The value should be between 0 and 100.',
    },
  },
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
