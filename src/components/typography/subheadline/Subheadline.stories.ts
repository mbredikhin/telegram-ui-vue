import Subheadline from './Subheadline.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
  title: 'Typography/Subheadline',
  component: Subheadline,
  tags: ['autodocs'],
  argTypes: {
    is: { control: 'text' },
    level: {
      control: 'select',
      options: ['1', '2'],
    },
    weight: {
      control: 'select',
      options: ['1', '2', '3'],
    },
    default: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Subheadline>;

export default meta;

type Story = StoryObj<typeof Subheadline>;

export const Default: Story = {
  render: (args) => ({
    components: { Subheadline },
    setup() {
      return { args };
    },
    template: '<Subheadline v-bind="args">{{ args.default }}</Subheadline>',
  }),
  args: {
    is: 'span',
    default: 'Text content',
  },
};
