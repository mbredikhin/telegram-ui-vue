import { Cell, Placeholder } from '@/components/blocks';
import Multiselectable from './Multiselectable.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
  title: 'Form/Multiselectable',
  component: Multiselectable,
  tags: ['autodocs'],
  argTypes: {
    checked: {
      type: 'boolean',
    },
  },
} satisfies Meta<typeof Multiselectable>;

export default meta;

type Story = StoryObj<typeof Multiselectable>;

export const Default: Story = {
  render: (args) => ({
    components: { Placeholder, Multiselectable },
    setup() {
      return { args };
    },
    template: `
    <Placeholder>
      <template #description>
        This component wraps input with type=checkbox, see usage example on the With Cell page
      </template>
      <Multiselectable v-bind="args" />
    </Placeholder>`,
  }),
  args: {
    checked: true,
  },
};

export const WithCell: Story = {
  render: (args) => ({
    components: { Cell, Multiselectable },
    setup() {
      return { args };
    },
    template: `
    <form>
      <Cell
        is="label"
        multiline
      >
        <template #description>
          Pass is='label' to Cell to make it clickable.
        </template>
        <template #before>
          <Multiselectable name="multiselect" value="1" v-bind="args" />
        </template>
        Multiselect in cell 1
      </Cell>
      <Cell
        is="label"
        description="Pass is='label' to Cell to make it clickable."
        multiline
      >
        <template #description>
          Pass is='label' to Cell to make it clickable.
        </template>
        <template #before>
          <Multiselectable name="multiselect" value="2" v-bind="args" />
        </template>
        Multiselect in cell 2
      </Cell>
    </form>`,
  }),
  args: {},
};
