import type { Meta, StoryObj } from '@storybook/vue3';
import InlineButtonsItem from './InlineButtonsItem.vue';
import { Component } from 'vue';
import Chat24Icon from '@/icons/24/chat.svg';

const meta = {
  title: 'Blocks/InlineButtons/InlineButtonsItem',
  component: InlineButtonsItem,
  tags: ['autodocs'],
  parameters: {
    controls: {
      include: ['mode', 'text'],
    },
  },
  argTypes: {
    mode: {
      control: 'select',
      options: ['plain', 'bezeled', 'gray'],
      description:
        "Optional mode for styling the button, with 'plain' as the default.",
    },
    text: {
      type: 'string',
      description: 'Text displayed inside the button.',
    },
  },
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
        <Chat24Icon />
      </InlineButtonsItem>
    </div>`,
  }),
  args: {
    mode: 'plain',
    text: 'Chat',
  },
};
