import Spinner from './Spinner.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
  title: 'Feedback/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['s', 'm', 'l'],
      description:
        "Determines the size of the spinner. Can be 'small' (s), 'medium' (m), or 'large' (l), with 'medium' being the default size.",
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  render: (args) => ({
    components: { Spinner },
    setup() {
      return { args };
    },
    template: `
    <div style="width: 400px; border: 1px dashed #9747FF; border-radius: 5px; padding: 20px">
      <Spinner v-bind="args" size="s" /> <br />
      <Spinner v-bind="args" size="m" /> <br />
      <Spinner v-bind="args" size="l" /> <br />
    </div>`,
  }),
  args: {},
};
