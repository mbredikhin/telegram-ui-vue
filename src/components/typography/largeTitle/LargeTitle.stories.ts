import LargeTitle from './LargeTitle.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
  title: 'Typography/LargeTitle',
  component: LargeTitle,
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
} satisfies Meta<typeof LargeTitle>;

export default meta;

type Story = StoryObj<typeof LargeTitle>;

export const Default: Story = {
  render: (args) => ({
    components: { LargeTitle },
    setup() {
      return { args };
    },
    template: '<LargeTitle v-bind="args">{{ args.default }}</LargeTitle>',
  }),
  args: {
    is: 'span',
    default: 'Text content',
  },
};
