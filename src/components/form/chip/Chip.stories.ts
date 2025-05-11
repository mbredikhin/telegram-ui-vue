import { Avatar, List } from '@/components/blocks';
import Chip from './Chip.vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import Cancel16Icon from '@/icons/16/cancel.svg?component';
import Radio from '../radio/Radio.vue';

const meta = {
  title: 'Form/Chip',
  component: Chip,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof Chip>;

const chips = ['Chip', "'n'", 'Dale'];

export const Default: Story = {
  render: (args) => ({
    components: { Chip, List },
    setup() {
      return { args, chips };
    },
    template: `
    <List style="background: var(--tgui-secondary-bg-color); padding: 20px">
      <div style="display: flex; gap: 16px">
        <Chip v-for="text of chips" :key="text" v-bind="args">
          {{ text }}
        </Chip>
      </div>
      <div style="display: flex; gap: 16px">
        <Chip v-for="text of chips" :key="text" v-bind="args" mode="mono">
          {{ text }}
        </Chip>
      </div>
      <div style="display: flex; gap: 16px">
        <Chip v-for="text of chips" :key="text" v-bind="args" mode="outline">
          {{ text }}
        </Chip>
      </div>
    </List>`,
  }),
  args: {},
};

export const WithAfter: Story = {
  render: (args) => ({
    components: {
      Chip,
      List,
      Cancel16Icon,
    },
    setup() {
      return { args, chips };
    },
    template: `
    <List style="background: var(--tgui-secondary-bg-color); padding: 20px">
      <div style="display: flex; gap: 8px">
        <Chip mode="elevated">
          Elevated
          <template #after>
            <Cancel16Icon />
          </template>
        </Chip>
        <Chip mode="mono">
          Mono
          <template #after>
            <Cancel16Icon />
          </template>
        </Chip>
        <Chip mode="outline">
          Outline
          <template #after>
            <Cancel16Icon />
          </template>
        </Chip>
      </div>
    </List>`,
  }),
  args: {},
};

export const WithBefore: Story = {
  render: (args) => ({
    components: {
      Chip,
      List,
      Avatar,
    },
    setup() {
      return { args, chips };
    },
    template: `
    <List style="background: var(--tgui-secondary-bg-color); padding: 20px">
      <div style="display: flex; gap: 8px">
        <Chip mode="elevated">
          Elevated
          <template #before>
            <Avatar size="20" />
          </template>
        </Chip>
        <Chip mode="mono">
          Mono
          <template #before>
            <Avatar size="20" />
          </template>
        </Chip>
        <Chip mode="outline">
          Outline
          <template #before>
            <Avatar size="20" />
          </template>
        </Chip>
      </div>
    </List>`,
  }),
  args: {},
};

export const WithRadioBefore: Story = {
  render: (args) => ({
    components: {
      Chip,
      List,
      Radio,
    },
    setup() {
      return { args, chips };
    },
    template: `
    <List style="background: var(--tgui-secondary-bg-color); padding: 20px">
      <div style="display: flex; gap: 8px">
        <Chip is="label" mode="elevated">
          Elevated
          <template #before>
            <Radio name="test" defaultChecked />
          </template>
        </Chip>
        <Chip is="label" mode="mono">
          Mono
          <template #before>
            <Radio name="test" />
          </template>
        </Chip>
        <Chip is="label" mode="outline">
          Outline
          <template #before>
            <Radio name="test" />
          </template>
        </Chip>
      </div>
    </List>`,
  }),
  args: {},
};
