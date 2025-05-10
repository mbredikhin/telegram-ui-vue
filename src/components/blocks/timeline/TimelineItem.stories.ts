import TimelineItem from './TimelineItem.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
  title: 'Blocks/Timeline/TimelineItem',
  component: TimelineItem,
  tags: ['autodocs'],
  parameters: {
    controls: { include: ['mode', 'horizontal', 'header', 'default'] },
  },
  argTypes: {
    mode: {
      control: 'select',
      options: ['active', 'pre-active'],
      description:
        'Internal prop, but you can change it. Marks line and dot of the item',
    },
    horizontal: {
      type: 'boolean',
      description: 'If true, the item will be horizontal, passed from parent',
    },
    header: {
      type: 'string',
      description: 'Header of the item',
    },
  },
} satisfies Meta<typeof TimelineItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    header: "It's my header = header prop",
    default: "It's my description = default slot content",
  },
} satisfies Story;
