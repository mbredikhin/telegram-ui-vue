import Title from './Title.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
  title: 'Typography/Title',
  component: Title,
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
      options: ['1', '2', '3'],
      description:
        'Determines the size and semantic tag of the title, with options for `h2`, `h3`, or `h4`.',
    },
    default: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Title>;

export default meta;

type Story = StoryObj<typeof Title>;

export const Default: Story = {
  render: (args) => ({
    components: { Title },
    setup() {
      return { args };
    },
    template: '<Title v-bind="args">{{ args.default }}</Title>',
  }),
  args: {
    is: 'span',
    default: 'Text content',
  },
};
