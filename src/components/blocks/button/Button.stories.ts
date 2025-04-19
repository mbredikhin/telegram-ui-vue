import Button from './Button.vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import Copy20Icon from '@/icons/20/copy.svg';
import PersonRemove24Icon from '@/icons/24/person_remove.svg';
import { Component } from 'vue';

const meta = {
  title: 'Blocks/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: `
    <Button v-bind="args">
      ${args.default}
    </Button>
    `,
  }),
  args: {
    size: 's',
    mode: 'filled',
    default: 'Action',
  },
};

export const WithIcon: Story = {
  render: (args) => ({
    components: {
      Button,
      Copy20Icon: Copy20Icon as unknown as Component,
      PersonRemove24Icon: PersonRemove24Icon as unknown as Component,
    },
    setup() {
      return { args };
    },
    template: `
    <Button v-bind="args">
      <template #before>
        <Copy20Icon v-if="args.size === 's'" />
        <PersonRemove24Icon v-else />
      </template>
      ${args.default}
    </Button>
    `,
  }),
  args: {
    size: 's',
    mode: 'filled',
    default: 'Create channel',
  },
};

export const Link: Story = {
  render: (args) => ({
    components: {
      Button,
    },
    setup() {
      return { args };
    },
    template: `
    <Button v-bind="args">
      ${args.default}
    </Button>
    `,
  }),
  args: {
    size: 's',
    mode: 'filled',
    default: 'No hello',
    target: '_blank',
    href: 'https://nohello.net/en/',
    is: 'a',
  },
};
