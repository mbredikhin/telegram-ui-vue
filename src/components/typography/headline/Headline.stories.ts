import Headline from './Headline.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
  title: 'Typography/Headline',
  component: Headline,
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
} satisfies Meta<typeof Headline>;

export default meta;

type Story = StoryObj<typeof Headline>;

export const Default: Story = {
  render: (args) => ({
    components: { Headline },
    setup() {
      return { args };
    },
    template: '<Headline v-bind="args">{{ args.default }}</Headline>',
  }),
  args: {
    is: 'span',
    default: 'Text content',
  },
};
