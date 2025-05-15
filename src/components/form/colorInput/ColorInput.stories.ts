import { List } from '@/components/blocks';
import ColorInput from './ColorInput.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
  title: 'Form/ColorInput',
  component: ColorInput,
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      type: 'string',
    },
    value: {
      type: 'string',
    },
    status: {
      control: 'select',
      options: ['default', 'error', 'focused'],
      description:
        'Defines the visual state of the form input (default, error, focused).',
    },
  },
} satisfies Meta<typeof ColorInput>;

export default meta;

type Story = StoryObj<typeof ColorInput>;

export const Default: Story = {
  render: (args) => ({
    components: { List, ColorInput },
    setup() {
      return { args };
    },
    template: `
    <List style="width: 500px; background: var(--tgui-secondary-bg-color)">
      <ColorInput v-bind="args">
        <template #header>Color</template>
        <template #placeholder>Select color</template>
      </ColorInput>
    </List>`,
  }),
};
