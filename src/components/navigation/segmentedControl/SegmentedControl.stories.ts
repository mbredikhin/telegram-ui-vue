import type { Meta, StoryObj } from '@storybook/vue3';
import SegmentedControl from './SegmentedControl.vue';
import { ref } from 'vue';
import SegmentedControlItem from './SegmentedControlItem.vue';

const meta = {
  title: 'Navigation/SegmentedControl/SegmentedControl',
  component: SegmentedControl,
  tags: ['autodocs'],
} satisfies Meta<typeof SegmentedControl>;

export default meta;

type Story = StoryObj<typeof SegmentedControl>;

const labels = [
  {
    label: 'Label',
    value: 'label',
  },
  {
    label: 'Label 2',
    value: 'label2',
  },
  {
    label: 'Label 3',
    value: 'label3',
  },
];

export const Default: Story = {
  render: (args) => ({
    components: { SegmentedControl, SegmentedControlItem },
    setup() {
      const selected = ref(labels[0].value);

      return { args, labels, selected };
    },
    template: `
    <div style="width: 500px">
      <SegmentedControl v-bind="args">
        <SegmentedControlItem
          v-for="{ value, label } of labels"
          :key="value"
          :selected="selected === value"
          @click="selected = value"
        >
          {{ label }}
        </SegmentedControlItem>
      </SegmentedControl>
    </div>`,
  }),
  args: {},
};
