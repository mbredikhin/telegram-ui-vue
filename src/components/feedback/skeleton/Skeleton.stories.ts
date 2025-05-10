import { Text } from '@/components/typography';
import Skeleton from './Skeleton.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    withoutAnimation: {
      type: 'boolean',
      description:
        'If true, disables the shimmering animation of the skeleton.',
    },
    visible: {
      type: 'boolean',
      description:
        'If true, the skeleton overlay is shown above the content. When false, the skeleton is hidden, showing any underlying content.',
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  render: (args) => ({
    components: { Skeleton, Text },
    setup() {
      return { args };
    },
    template: `
    <div style="width: 400px; border: 1px dashed #9747FF; border-radius: 5px; padding: 20px;">
      <Skeleton v-bind="args">
        <Text>Hello!!!!</Text>
      </Skeleton>
    </div>`,
  }),
  args: {
    visible: true,
    withoutAnimation: false,
  },
};
