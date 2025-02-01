import Text from './Text.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
  title: 'Typography/Text',
  component: Text,
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
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof Text>;

export const Default: Story = {
  render: (args) => ({
    components: { Text },
    setup() {
      return { args };
    },
    template: '<Text v-bind="args">{{ args.default }}</Text>',
  }),
  args: {
    is: 'span',
    default: 'Text content',
  },
};
