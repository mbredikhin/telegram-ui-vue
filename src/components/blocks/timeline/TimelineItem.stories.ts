import TimelineItem from './TimelineItem.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
  title: 'Blocks/Timeline/TimelineItem',
  component: TimelineItem,
  tags: ['autodocs'],
} satisfies Meta<typeof TimelineItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    header: "It's my header = header prop",
    default: "It's my description = default slot content",
  },
} satisfies Story;
