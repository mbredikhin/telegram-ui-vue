import Section from './Section.vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import Chat28Icon from '@/icons/28/chat.svg';
import Devices28Icon from '@/icons/28/devices.svg';
import Stats28Icon from '@/icons/28/stats.svg';
import List from '../list/List.vue';
import Cell from '../cell/Cell.vue';
import { Input } from '@/components/form';
import IconContainer from '../iconContainer/IconContainer.vue';

const meta = {
  title: 'Blocks/Section/Section',
  component: Section,
  tags: ['autodocs'],
} satisfies Meta<typeof Section>;

export default meta;

type Story = StoryObj<typeof Section>;

const cells = [
  {
    id: 1,
    icon: Chat28Icon,
    text: 'Chat Settings',
  },
  {
    id: 2,
    icon: Devices28Icon,
    text: 'Data and Storage',
  },
  {
    id: 3,
    icon: Stats28Icon,
    text: 'Devices',
  },
];

export const Default: Story = {
  render: (args) => ({
    components: { Section, List, Cell, IconContainer, Input },
    setup() {
      return { args, cells };
    },
    template: `
    <List style="background: var(--tgui-secondary-bg-color); padding: 40px; width: 500px">
      <Section v-bind="args">
        <template #header>Main Settings</template>
        <template #footer>The official Telegram app is available for Android, iPhone, iPad, Windows, macOS and Linux.</template>
        <Cell
          v-for="cell of cells"
          :key="cell.id"
        >
          <template #before>
            <IconContainer>
              <component :is="cell.icon" />
            </IconContainer>
          </template>
          {{ cell.text }}
        </Cell>
      </Section>

      <Section v-bind="args">
        <template #header>Personal Information</template>
        <template #footer>The official Telegram app is available for Android, iPhone, iPad, Windows, macOS and Linux.</template>
        <Input
          type="text"
          placeholder="21 y.o. designer from San Francisco"
        >
          <template #header>First name</template>
        </Input>
        <Input
          type="text"
          placeholder="21 y.o. designer from San Francisco"
        >
          <template #header>Last name</template>
        </Input>
      </Section>
    </List>`,
  }),
  args: {},
};
