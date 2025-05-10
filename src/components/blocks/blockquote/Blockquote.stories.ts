import Blockquote from './Blockquote.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
  title: 'Blocks/Blockquote',
  component: Blockquote,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'other'],
    },
  },
} satisfies Meta<typeof Blockquote>;

export default meta;

type Story = StoryObj<typeof Blockquote>;

export const Default: Story = {
  render: (args) => ({
    components: { Blockquote },
    setup() {
      return { args };
    },
    template: `
    <Blockquote v-bind="args">
      <template #default>${args['default'] ?? ''}</template>
      <template #top-right-icon>${args['top-right-icon'] ?? ''}</template>
    </Blockquote>`,
  }),
  args: {
    type: 'text',
    default:
      'There is grandeur in this view of life, with its several powers, having been originally breathed by the Creator into a few forms or into one; and that, whilst this planet has gone circling on according to the fixed law of gravity, from so simple a beginning endless forms most beautiful and most wonderful have been, and are being evolved.',
    'top-right-icon': '',
  },
};
