import { Cell, Placeholder } from '@/components/blocks';
import Checkbox from './Checkbox.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
  title: 'Form/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: (args) => ({
    components: { Placeholder, Checkbox },
    setup() {
      return { args };
    },
    template: `
    <Placeholder>
      <template #description>
        This component wraps input with type=checkbox, see usage example on the With Cell page
      </template>
      <Checkbox v-bind="args" />
    </Placeholder>`,
  }),
  args: {
    defaultChecked: true,
  },
};

export const WithCells: Story = {
  render: (args) => ({
    components: { Cell, Checkbox },
    setup() {
      return { args };
    },
    template: `
    <Cell
      is="label"
      multiline
    >
      <template #before>
        <Checkbox name="checkbox" value="1" v-bind="args" />
      </template>
      <template #description>
        Pass is='label' to Cell to make it clickable.
      </template>
      Apple
    </Cell>
    <Cell
      is="label"
      multiline
    >
      <template #before>
        <Checkbox name="checkbox" value="2" v-bind="args" />
      </template>
      <template #description>
        Pass is='label' to Cell to make it clickable.
      </template>
      Milk
    </Cell>`,
  }),
  args: {},
};
