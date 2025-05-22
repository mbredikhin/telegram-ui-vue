import Subheadline from './Subheadline.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
  title: 'Typography/Subheadline',
  component: Subheadline,
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
    level: {
      control: 'select',
      options: ['1', '2'],
      description:
        'Determines the size of the subheadline, with `1` being the default and `2` providing a smaller option.',
    },
    default: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Subheadline>;

export default meta;

type Story = StoryObj<typeof Subheadline>;

export const Default: Story = {
  render: (args) => ({
    components: { Subheadline },
    setup() {
      return { args };
    },
    template: '<Subheadline v-bind="args">{{ args.default }}</Subheadline>',
  }),
  args: {
    is: 'span',
    default: 'Text content',
  },
};
