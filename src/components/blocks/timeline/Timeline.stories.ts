import Timeline from './Timeline.vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import TimelineItem from './TimelineItem.vue';

const meta = {
  title: 'Blocks/Timeline/Timeline',
  component: Timeline,
  tags: ['autodocs'],
} satisfies Meta<typeof Timeline>;

export default meta;

type Story = StoryObj<typeof meta>;

const timelineItems = [
  {
    key: '1',
    header: 'Arrived',
    default: 'Yesterday',
  },
  {
    key: '2',
    header: 'Departed',
    default: 'Today',
  },
  {
    key: '3',
    header: 'In transit',
    default: 'Tomorrow',
  },
  {
    key: '4',
    header: 'Processed to delivery center',
    default: 'Next week',
  },
  {
    key: '5',
    header: 'Shipped',
    default: 'Someday',
  },
];

export const Default: Story = {
  render: (args) => ({
    components: {
      Timeline,
      TimelineItem,
    },
    setup() {
      return { args };
    },
    template: `
    <Timeline v-bind="args">
      ${timelineItems
        .map(
          (item) =>
            `<TimelineItem key="${item.key}" header="${item.header}">
            ${item.default}
          </TimelineItem>`
        )
        .join('')}
    </Timeline>`,
  }),
  args: {
    active: 2,
  },
} satisfies Story;

export const Horizontal: Story = {
  args: {
    horizontal: true,
    ...Default.args,
  },
} satisfies Story;
