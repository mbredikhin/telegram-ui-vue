import { Cell, Placeholder } from '@/components/blocks';
import Switch from './Switch.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
  title: 'Form/Switch',
  component: Switch,
  tags: ['autodocs'],
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  render: (args) => ({
    components: { Placeholder, Switch },
    setup() {
      return { args };
    },
    template: `
    <Placeholder>
      <template #description>This component wraps input with type=checkbox</template>
      <div style="display: flex; gap: 6px;">
        <Switch :checked="true" v-bind="args" /> <br />
        <Switch :checked="false" v-bind="args" /> <br />
        <Switch :disabled="true" :checked="true" v-bind="args" /> <br />
        <Switch :disabled="true" :checked="false" v-bind="args" /> <br />
      </div>
    </Placeholder>`,
  }),
  args: {},
};

export const WithCell: Story = {
  render: (args) => ({
    components: { Cell, Switch },
    setup() {
      return { args };
    },
    template: `
    <Cell
      is="label"
      multiline
    >
      <template #description>Click on me</template>
      <template #after>
        <Switch defaultChecked v-bind="args" />
      </template>
      Radio in a cell
    </Cell>`,
  }),
  args: {},
};
