import Typography from './Typography.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
  title: 'Typography/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    is: { control: 'text' },
    weight: {
      control: 'select',
      options: ['1', '2', '3'],
    },
    default: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  render: (args) => ({
    components: { Typography },
    setup() {
      return { args };
    },
    template: '<Typography v-bind="args">{{ args.default }}</Typography>',
  }),
  args: {
    is: 'span',
    default: 'Text content',
  },
};
