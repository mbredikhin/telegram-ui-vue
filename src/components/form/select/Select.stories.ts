import { List } from '@/components/blocks';
import Select from './Select.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
  title: 'Form/Select',
  component: Select,
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: (args) => ({
    components: { List, Select },
    setup() {
      return { args };
    },
    template: `
    <List style="width: 240px; background: var(--tgui-secondary-bg-color)">
      <Select placeholder="I am usual input, just leave me alone">
        <template #header>Select</template>
        <template #default>
          <option>Hello</option>
          <option>Okay</option>
        </template>
      </Select>
    </List>`,
  }),
};
