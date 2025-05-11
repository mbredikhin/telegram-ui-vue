import Avatar from './Avatar.vue';
import AvatarBadge from './AvatarBadge.vue';
import Quote12Icon from '@/icons/12/quote.svg?component';
import Stats28Icon from '@/icons/28/stats.svg?component';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
  title: 'Blocks/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    controls: { include: ['size', 'acronym', 'src'] },
  },
  argTypes: {
    size: {
      control: 'select',
      options: [20, 24, 28, 40, 48, 96],
      description:
        'Specifies the size of the image, with a default of 40. Sizes are defined in pixels.',
    },
    acronym: {
      type: 'string',
      description:
        'One or two letters to be shown as a placeholder. `fallback-icon` will not be used if `acronym` is provided.',
    },
    src: {
      type: 'string',
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
        <AvatarBadge type="number">42</AvatarBadge>
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
      Quote12Icon,
      Stats28Icon,
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
