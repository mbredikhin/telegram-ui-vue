import type { Meta, StoryObj } from '@storybook/vue3';
import InlineButtons from './InlineButtons.vue';
import InlineButtonsItem from './InlineButtonsItem.vue';
import { Component } from 'vue';
import Chat24Icon from '@/icons/24/chat.svg';
import Notifications24Icon from '@/icons/24/notifications.svg';
import QR24Icon from '@/icons/24/qr.svg';

const meta = {
  title: 'Blocks/InlineButtons/InlineButtons',
  component: InlineButtons,
  tags: ['autodocs'],
} satisfies Meta<typeof InlineButtons>;

export default meta;

type Story = StoryObj<typeof InlineButtons>;

export const Default: Story = {
  render: (args) => ({
    components: {
      InlineButtons,
      InlineButtonsItem,
      Chat24Icon: Chat24Icon as unknown as Component,
      Notifications24Icon: Notifications24Icon as unknown as Component,
      QR24Icon: QR24Icon as unknown as Component,
    },
    setup() {
      return { args };
    },
    template: `
    <div style="max-width: 160px">
      <InlineButtons v-bind="args">
        <InlineButtonsItem text="Chat">
          <Chat24Icon />
        </InlineButtonsItem>
        <InlineButtonsItem text="Mute">
          <Notifications24Icon />
        </InlineButtonsItem>
        <InlineButtonsItem text="QR">
          <QR24Icon />
        </InlineButtonsItem>
      </InlineButtons>
    </div>`,
  }),
  args: {
    mode: 'plain',
  },
};
