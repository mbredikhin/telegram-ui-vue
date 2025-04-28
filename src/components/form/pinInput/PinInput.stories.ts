import PinInput from './PinInput.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
  title: 'Form/PinInput',
  component: PinInput,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof PinInput>;

export default meta;

type Story = StoryObj<typeof PinInput>;

export const Default: Story = {
  render: (args) => ({
    components: { PinInput },
    setup() {
      return { args };
    },
    template: `
    <div style="height: 600px">
      <PinInput v-bind="args" />
    </div>`,
  }),
  args: {},
};
