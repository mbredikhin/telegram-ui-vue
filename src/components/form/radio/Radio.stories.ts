import { Cell, Placeholder } from '@/components/blocks';
import Radio from './Radio.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
  title: 'Form/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  render: (args) => ({
    components: { Radio, Placeholder },
    setup() {
      return { args };
    },
    template: `
    <Placeholder>
      <template #description>
        This component wraps input with type=radio, see usage example on the With Cell page
      </template>
      <Radio v-bind="args" />
    </Placeholder>`,
  }),
  args: {
    defaultChecked: true,
  },
};

export const WithCells: Story = {
  render: (args) => ({
    components: { Radio, Cell },
    setup() {
      return { args };
    },
    template: `
    <form>
      <Cell
        is="label"
        multiline
      >
        <template #before>
          <Radio name="radio" value="blue" v-bind="args" />
        </template>
        <template #description>
          The story ends, you wake up in your bed and believe whatever you want to believe
        </template>
        Blue pill
      </Cell>

      <Cell
        is="label"
        multiline
      >
        <template #before>
          <Radio name="radio" value="red pill" v-bind="args" />
        </template>
        <template #description>
          You stay in Wonderland, and I show you how deep the rabbit hole goes
        </template>
        Red pill
      </Cell>
    </form>`,
  }),
  args: {},
};
