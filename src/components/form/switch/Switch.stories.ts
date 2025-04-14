import { Placeholder } from '@/components/blocks';
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
        <Switch v-bind="args" /> <br />
        <Switch defaultChecked v-bind="args" /> <br />
        <Switch disabled v-bind="args" /> <br />
        <Switch disabled checked v-bind="args" /> <br />
      </div>
    </Placeholder>`,
  }),
  args: {
    defaultChecked: true,
  },
};
