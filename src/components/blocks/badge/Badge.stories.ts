import Badge from './Badge.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
  title: 'Blocks/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['number', 'dot'],
    },
    mode: {
      control: 'select',
      options: ['primary', 'critical', 'secondary', 'gray', 'white'],
    },
    large: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof Badge>;

export const Dot: Story = {
  render: (args) => ({
    components: { Badge },
    setup() {
      return { args };
    },
    template: `<Badge v-bind="args">${args.default ?? ''}</Badge>`,
  }),
  args: {
    type: 'dot',
    mode: 'primary',
    default: 50,
  },
};

export const Number: Story = {
  render: (args) => ({
    components: { Badge },
    setup() {
      return { args };
    },
    template: `
    <Badge v-bind="args">${args.default ?? ''}</Badge>`,
  }),
  args: {
    type: 'number',
    mode: 'primary',
    default: 50,
  },
};
