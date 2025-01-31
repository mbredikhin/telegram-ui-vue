import LargeTitle from './LargeTitle.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
  title: 'Typography/LargeTitle',
  component: LargeTitle,
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
} satisfies Meta<typeof LargeTitle>;

export default meta;

type Story = StoryObj<typeof LargeTitle>;

export const Default: Story = {
  render: (args) => ({
    components: { LargeTitle },
    setup() {
      return { args };
    },
    template: '<LargeTitle v-bind="args">{{ args.default }}</LargeTitle>',
  }),
  args: {
    is: 'span',
    default: 'Text content',
  },
};
