import Typography from './Typography.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
  title: 'Typography/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    weight: {
      control: 'select',
      options: ['1', '2', '3'],
      description:
        'Controls the font weight of the text, with options ranging from light to bold.',
    },
    caps: {
      type: 'boolean',
      description:
        'If true, transforms the text to uppercase for stylistic emphasis.',
    },
    is: {
      control: 'text',
      description: 'Specifies the HTML tag used to render the text.',
    },
    plain: {
      type: 'boolean',
      description:
        'When true, removes the default margins around the text, useful for inline styling or custom layouts.',
    },
    default: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  render: (args) => ({
    components: { Typography },
    setup() {
      return { args };
    },
    template: '<Typography v-bind="args">{{ args.default }}</Typography>',
  }),
  args: {
    is: 'span',
    default: 'Text content',
  },
};
