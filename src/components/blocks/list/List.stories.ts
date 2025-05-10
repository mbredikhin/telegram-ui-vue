import { Input } from '@/components/form';
import { Section } from '..';
import List from './List.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
  title: 'Blocks/List',
  component: List,
  tags: ['autodocs'],
  argTypes: {
    is: {
      type: 'string',
      description:
        'Specifies the HTML tag or component used to render the list, defaulting to `div`.',
    },
  },
} satisfies Meta<typeof List>;

export default meta;

type Story = StoryObj<typeof List>;

export const Default: Story = {
  render: (args) => ({
    components: { List, Section, Input },
    setup() {
      return { args };
    },
    template: `
    <List v-bind="args" style="background: var(--tgui-secondary-bg-color)">
      <Section v-for="(_, index) in Array.from({ length: 3 })" :key="index">
        <template #header>Personal Information</template>
        <template #footer>The official Telegram app is available for Android, iPhone, iPad, Windows, macOS and Linux.</template>
        <Input
          type="text"
          placeholder="21 y.o. designer from San Francisco"
        >
          <template #header>First name</template>
        </Input>
      </Section>
    </List>`,
  }),
  args: {},
};
