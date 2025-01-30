import Caption from './Caption.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
  title: 'Typography/Caption',
  component: Caption,
  tags: ['autodocs'],
  argTypes: {
    is: { control: 'text' },
    level: {
      control: 'select',
      options: ['1', '2'],
    },
    default: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Caption>;

export default meta;

type Story = StoryObj<typeof Caption>;

export const Default: Story = {
  render: (args) => ({
    components: { Caption },
    setup() {
      return { args };
    },
    template: '<Caption v-bind="args">{{ args.default }}</Caption>',
  }),
  args: {
    is: 'span',
    default: 'Text content',
  },
};
