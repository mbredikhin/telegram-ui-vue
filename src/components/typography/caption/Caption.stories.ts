import Caption from './Caption.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
  title: 'Typography/Caption',
  component: Caption,
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
    level: {
      control: 'select',
      options: ['1', '2'],
      description:
        'The size level of the caption, influencing its styling and typography size.',
    },
    default: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Caption>;

export default meta;

type Story = StoryObj<typeof Caption>;

export const Default: Story = {
  render: (args) => ({
    components: { Caption },
    setup() {
      return { args };
    },
    template: '<Caption v-bind="args">{{ args.default }}</Caption>',
  }),
  args: {
    is: 'span',
    default: 'Text content',
  },
};
