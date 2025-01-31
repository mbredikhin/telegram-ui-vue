import Headline from './Headline.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
  title: 'Typography/Headline',
  component: Headline,
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
} satisfies Meta<typeof Headline>;

export default meta;

type Story = StoryObj<typeof Headline>;

export const Default: Story = {
  render: (args) => ({
    components: { Headline },
    setup() {
      return { args };
    },
    template: '<Headline v-bind="args">{{ args.default }}</Headline>',
  }),
  args: {
    is: 'span',
    default: 'Text content',
  },
};
