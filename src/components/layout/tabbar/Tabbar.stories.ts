import Tabbar from './Tabbar.vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import Devices28Icon from '@/icons/28/devices.svg';
import Chat28Icon from '@/icons/28/chat.svg';
import Stats28Icon from '@/icons/28/stats.svg';
import { ref } from 'vue';
import TabbarItem from './TabbarItem.vue';

const meta = {
  title: 'Layout/Tabbar/Tabbar',
  component: Tabbar,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Tabbar>;

export default meta;

type Story = StoryObj<typeof Tabbar>;

const tabs = [
  {
    id: 0,
    icon: Devices28Icon,
    text: 'Devices',
  },
  {
    id: 1,
    icon: Chat28Icon,
    text: 'Chat',
  },
  {
    id: 2,
    icon: Stats28Icon,
    text: 'Stats',
  },
];

export const Default: Story = {
  render: (args) => ({
    components: { Tabbar, TabbarItem },
    setup() {
      const currentTab = ref(tabs[0].id);

      return { args, tabs, currentTab };
    },
    template: `
    <div style="height: 100px">
      <Tabbar>
        <TabbarItem
          v-for="{ id, text, icon } of tabs"
          :key="id"
          :selected="id === currentTab"
          @click="currentTab = id"
        >
          <template #text>{{ text }}</template>
          <component :is="icon" />
        </TabbarItem>
      </Tabbar>
    </div>`,
  }),
  args: {},
};
