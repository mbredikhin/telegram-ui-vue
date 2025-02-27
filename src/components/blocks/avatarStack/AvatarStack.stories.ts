import AvatarStack from './AvatarStack.vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { Avatar } from '../avatar';

const AVATAR_URL = 'https://avatars.githubusercontent.com/u/16864992?v=4';

const meta = {
  title: 'Blocks/AvatarStack',
  component: AvatarStack,
  tags: ['autodocs'],
} satisfies Meta<typeof AvatarStack>;

export default meta;

type Story = StoryObj<typeof AvatarStack>;

export const Default: Story = {
  render: (args) => ({
    components: { AvatarStack, Avatar },
    setup() {
      return { args };
    },
    template: `
    <AvatarStack v-bind="args">
      <Avatar size="48" src="${AVATAR_URL}" />
      <Avatar size="48" src="${AVATAR_URL}" />
      <Avatar size="48" src="${AVATAR_URL}" />
      <Avatar size="48" src="${AVATAR_URL}" />
    </AvatarStack>`,
  }),
  args: {},
};
