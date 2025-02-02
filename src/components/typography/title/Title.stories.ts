import Title from './Title.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
  title: 'Typography/Title',
  component: Title,
  tags: ['autodocs'],
  argTypes: {
    is: { control: 'text' },
    level: {
      control: 'select',
      options: ['1', '2', '3'],
    },
    weight: {
      control: 'select',
      options: ['1', '2', '3'],
    },
    default: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Title>;

export default meta;

type Story = StoryObj<typeof Title>;

export const Default: Story = {
  render: (args) => ({
    components: { Title },
    setup() {
      return { args };
    },
    template: '<Title v-bind="args">{{ args.default }}</Title>',
  }),
  args: {
    is: 'span',
    default: 'Text content',
  },
};
