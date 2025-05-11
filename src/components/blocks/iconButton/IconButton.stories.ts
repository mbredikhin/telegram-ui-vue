import type { Meta, StoryObj } from '@storybook/vue3';
import IconButton from './IconButton.vue';
import QuestionMark20Icon from '@/icons/20/question-mark.svg?component';
import QR24Icon from '@/icons/24/qr.svg?component';
import Stats28Icon from '@/icons/28/stats.svg?component';

const meta = {
  title: 'Blocks/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  parameters: {
    controls: { include: ['size', 'mode'] },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['s', 'm', 'l'],
    },
    mode: {
      control: 'select',
      options: ['bezeled', 'plain', 'gray', 'outline'],
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  render: (args) => ({
    components: {
      IconButton,
      QuestionMark20Icon,
      QR24Icon,
      Stats28Icon,
    },
    setup() {
      return { args };
    },
    template: `
    <IconButton v-bind="args">
      <QuestionMark20Icon v-if="args.size === 's'" />
      <QR24Icon v-if="args.size === 'm'" />
      <Stats28Icon v-if="args.size === 'l'" />
    </IconButton>`,
  }),
  args: {
    size: 's',
    mode: 'bezeled',
  },
};
