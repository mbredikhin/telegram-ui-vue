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
  },
} satisfies Meta<typeof Caption>;

export default meta;

type Story = StoryObj<typeof Caption>;

export const Caption1: Story = {
  render: (args) => ({
    components: { Caption },
    setup() {
      return { args };
    },
    template: `
      <Caption weight="1" v-bind="args">
        Caption 1 · Regular
      </Caption>
      <br />
      <br />
      <Caption weight="2" v-bind="args">
        Caption 1 · Semibold
      </Caption>
      <br />
      <br />
      <Caption weight="3" v-bind="args">
        Caption 1 · Bold
      </Caption>
    `,
  }),
  args: {
    level: '1',
  },
};

export const Caption2: Story = {
  render: (args) => ({
    components: { Caption },
    setup() {
      return { args };
    },
    template: `
      <Caption weight="1" v-bind="args">
        Caption 2 · Regular
      </Caption>
      <br />
      <br />
      <Caption weight="2" v-bind="args">
        Caption 2 · Semibold
      </Caption>
      <br />
      <br />
      <Caption weight="3" v-bind="args">
        Caption 2 · Bold
      </Caption>
    `,
  }),
  args: {
    level: '2',
  },
};
