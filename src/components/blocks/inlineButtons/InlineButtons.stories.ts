import type { Meta, StoryObj } from '@storybook/vue3';
import InlineButtons from './InlineButtons.vue';
import InlineButtonsItem from './InlineButtonsItem.vue';
import Chat24Icon from '@/icons/24/chat.svg?component';
import Notifications24Icon from '@/icons/24/notifications.svg?component';
import QR24Icon from '@/icons/24/qr.svg?component';

const meta = {
  title: 'Blocks/InlineButtons/InlineButtons',
  component: InlineButtons,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['plain', 'bezeled', 'gray'],
      description:
        'Dictates the styling mode for the inline buttons, affecting color and background.',
    },
  },
} satisfies Meta<typeof InlineButtons>;

export default meta;

type Story = StoryObj<typeof InlineButtons>;

export const Default: Story = {
  render: (args) => ({
    components: {
      InlineButtons,
      InlineButtonsItem,
      Chat24Icon,
      Notifications24Icon,
      QR24Icon,
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
