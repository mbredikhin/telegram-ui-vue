import { Text } from '@/components/typography';
import FixedLayout from './FixedLayout.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
  title: 'Layout/FixedLayout',
  component: FixedLayout,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof FixedLayout>;

export default meta;

type Story = StoryObj<typeof FixedLayout>;

export const Default: Story = {
  render: (args) => ({
    components: { FixedLayout, Text },
    setup() {
      return { args };
    },
    template: `
    <div style="height: 200px; width: 400px">
      <FixedLayout vertical="top" style="padding: 16px">
        <Text>This is FixedLayout with top vertical</Text>
      </FixedLayout>
      <FixedLayout style="padding: 16px">
        <Text>This is FixedLayout with default vertical</Text>
      </FixedLayout>
    </div>`,
  }),
  args: {},
};
