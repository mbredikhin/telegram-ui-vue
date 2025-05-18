import FixedLayout from './FixedLayout.vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { Button } from '@/components/blocks';

const meta = {
  title: 'Layout/FixedLayout',
  component: FixedLayout,
  tags: ['autodocs'],
  argTypes: {
    is: {
      type: 'string',
      description:
        "The component type to render, allowing for semantic HTML use. Defaults to 'div'.",
    },
    vertical: {
      control: 'select',
      options: ['top', 'bottom'],
      description:
        "Determines the vertical positioning of the layout within its container. Options are 'top' or 'bottom'.",
    },
  },
} satisfies Meta<typeof FixedLayout>;

export default meta;

type Story = StoryObj<typeof FixedLayout>;

export const Default: Story = {
  render: (args) => ({
    components: { FixedLayout, Button },
    setup() {
      return { args };
    },
    template: `
    <div style="height: 200px; width: 400px">
      <FixedLayout vertical="top" style="padding: 16px">
        <Button size="l" stretched>
          This is FixedLayout with top vertical
        </Button>
      </FixedLayout>
      <FixedLayout style="padding: 16px">
        <Button size="l" stretched>
          This is FixedLayout with default vertical
        </Button>
      </FixedLayout>
    </div>`,
  }),
  args: {},
};
