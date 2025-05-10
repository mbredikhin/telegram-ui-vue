import { Text } from '@/components/typography';
import Spoiler from './Spoiler.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
  title: 'Feedback/Spoiler',
  component: Spoiler,
  tags: ['autodocs'],
  argTypes: {
    visible: {
      type: 'boolean',
      description: 'Controls the visibility of the content inside the spoiler.',
    },
  },
} satisfies Meta<typeof Spoiler>;

export default meta;

type Story = StoryObj<typeof Spoiler>;

export const Default: Story = {
  render: (args) => ({
    components: { Spoiler, Text },
    setup() {
      return { args };
    },
    template: `
    <div>
      <Spoiler v-bind="args">
        <div style="width: 200px; height: 200px; background: yellowgreen"></div>
      </Spoiler>
      <br />
      <Spoiler v-bind="args">
        <Text>
          Hello
        </Text>
      </Spoiler>
    </div>`,
  }),
  args: {},
};
