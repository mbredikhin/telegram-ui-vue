import Avatar from './Avatar.vue';
import AvatarBadge from './AvatarBadge.vue';
import Quote12Icon from '@/icons/12/quote.svg';
import Stats28Icon from '@/icons/28/stats.svg';
import type { Meta, StoryObj } from '@storybook/vue3';
import { Component } from 'vue';

const meta = {
  title: 'Blocks/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: [20, 24, 28, 40, 48, 96],
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof Avatar>;

const Default: Story = {
  render: (args) => ({
    components: { Avatar },
    setup() {
      return { args };
    },
    template: `
    <Avatar v-bind="args">
      <template #fallback-icon>${args['fallback-icon'] ?? ''}</template>
    </Avatar>`,
  }),
  args: {},
};

export const ValidImage: Story = {
  render: Default.render,
  args: {
    size: 96,
    src: 'https://avatars.githubusercontent.com/u/16864992?v=4',
  },
};

export const InvalidImage: Story = {
  render: Default.render,
  args: {
    size: 96,
    src: 'https://avatars.gitontent.com/u/16864992?v=4',
  },
};

export const WithFallback: Story = {
  render: Default.render,
  args: {
    size: 96,
    src: 'https://avatars.gitontent.com/u/16864992?v=4',
    ['fallback-icon']: '<span>😕</span>',
  },
};

export const WithBadge: Story = {
  render: (args) => ({
    components: { Avatar, AvatarBadge },
    setup() {
      return { args };
    },
    template: `
    <Avatar v-bind="args">
      <template #default>
        <AvatarBadge v-bind="{ type: 'number' }">42</AvatarBadge>
      </template>
      <template #fallback-icon>${args['fallback-icon'] ?? ''}</template>
    </Avatar>`,
  }),
  args: {
    size: 48,
    src: 'https://avatars.githubusercontent.com/u/16864992?v=4',
    ['fallback-icon']: '<span>😕</span>',
  },
};

export const WithAcronym: Story = {
  render: Default.render,
  args: {
    size: 96,
    acronym: 'MB',
  },
};

export const WithChildren: Story = {
  render: (args) => ({
    components: {
      Avatar,
      Quote12Icon: Quote12Icon as unknown as Component,
      Stats28Icon: Stats28Icon as unknown as Component,
    },
    setup() {
      return { args };
    },
    template: `
    <Avatar v-bind="args">
      <Quote12Icon v-if="(args?.size || 0) <= 28" />
      <Stats28Icon v-else />
    </Avatar>`,
  }),
  args: {
    size: 48,
    default: '<Stats28Icon />',
  },
};
