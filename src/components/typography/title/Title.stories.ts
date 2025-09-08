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
  },
} satisfies Meta<typeof Title>;

export default meta;

type Story = StoryObj<typeof Title>;

export const Title1: Story = {
  render: (args) => ({
    components: { Title },
    setup() {
      return { args };
    },
    template: `
      <Title weight="1" v-bind="args">
        Title 1 · Regular
      </Title>
      <br />
      <br />
      <Title weight="2" v-bind="args">
        Title 1 · Semibold
      </Title>
      <br />
      <br />
      <Title weight="3" v-bind="args">
        Title 1 · Bold
      </Title>
    `,
  }),
  args: {
    level: '1',
    plain: false,
  },
};

export const Title2: Story = {
  render: (args) => ({
    components: { Title },
    setup() {
      return { args };
    },
    template: `
      <Title weight="1" v-bind="args">
        Title 2 · Regular
      </Title>
      <br />
      <br />
      <Title weight="2" v-bind="args">
        Title 2 · Semibold
      </Title>
      <br />
      <br />
      <Title weight="3" v-bind="args">
        Title 2 · Bold
      </Title>
    `,
  }),
  args: {
    level: '2',
    plain: false,
  },
};

export const Title3: Story = {
  render: (args) => ({
    components: { Title },
    setup() {
      return { args };
    },
    template: `
      <Title weight="1" v-bind="args">
        Title 3 · Regular
      </Title>
      <br />
      <br />
      <Title weight="2" v-bind="args">
        Title 3 · Semibold
      </Title>
      <br />
      <br />
      <Title weight="3" v-bind="args">
        Title 3 · Bold
      </Title>
    `,
  }),
  args: {
    level: '3',
    plain: false,
  },
};
