import CircularProgress from './CircularProgress.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
  title: 'Feedback/CircularProgress',
  component: CircularProgress,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description:
        "Specifies the size of the circular progress indicator. Can be 'small', 'medium', or 'large'.",
    },
    progress: {
      type: 'number',
      description:
        'Current progress of the circular indicator, expressed as a percentage from 0 to 100.',
    },
  },
} satisfies Meta<typeof CircularProgress>;

export default meta;

type Story = StoryObj<typeof CircularProgress>;

export const Default: Story = {
  render: (args) => ({
    components: { CircularProgress },
    setup() {
      return { args };
    },
    template: `
    <div style="display: flex; gap: 20px">
      <CircularProgress size="small" :progress="10" v-bind="args" /> <br />
      <CircularProgress size="medium" :progress="50" v-bind="args" /> <br />
      <CircularProgress size="large" :progress="80" v-bind="args" /> <br />
    </div>`,
  }),
  args: {},
};
