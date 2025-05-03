import type { Meta, StoryObj } from '@storybook/vue3';
import InlineButtonsItem from './InlineButtonsItem.vue';
import { Component } from 'vue';
import Chat24Icon from '@/icons/24/chat.svg';

const meta = {
  title: 'Blocks/InlineButtons/InlineButtonsItem',
  component: InlineButtonsItem,
  tags: ['autodocs'],
} satisfies Meta<typeof InlineButtonsItem>;

export default meta;

type Story = StoryObj<typeof InlineButtonsItem>;

export const Default: Story = {
  render: (args) => ({
    components: {
      InlineButtonsItem,
      Chat24Icon: Chat24Icon as unknown as Component,
    },
    setup() {
      return { args };
    },
    template: `
    <div style="max-width: 160px">
      <InlineButtonsItem v-bind="args">
        <template #default><Chat24Icon /></template>
      </InlineButtonsItem>
    </div>`,
  }),
  args: {
    mode: 'plain',
    text: 'Chat',
  },
};
