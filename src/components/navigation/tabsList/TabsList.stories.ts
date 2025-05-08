import type { Meta, StoryObj } from '@storybook/vue3';
import TabsList from './TabsList.vue';
import { ref } from 'vue';
import TabsListItem from './TabsListItem.vue';

const meta = {
  title: 'Navigation/TabsList/TabsList',
  component: TabsList,
  tags: ['autodocs'],
} satisfies Meta<typeof TabsList>;

export default meta;

type Story = StoryObj<typeof TabsList>;

const labels = [
  {
    label: 'Label 1',
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
    components: { TabsList, TabsListItem },
    setup() {
      const selected = ref(labels[0].value);

      return { args, labels, selected };
    },
    template: `
    <div style="max-width: 500px">
      <TabsList v-bind="args">
        <TabsListItem
          v-for="{ value, label } of labels"
          :key="value"
          :selected="selected === value"
          @click="selected = value"
        >
          {{ label }}
        </TabsListItem>
      </TabsList>
    </div>`,
  }),
  args: {},
};
