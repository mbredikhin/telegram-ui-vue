import type { Meta, StoryObj } from '@storybook/vue3';
import Cell from './Cell.vue';
import Badge from '../badge/Badge.vue';
import Avatar from '../avatar/Avatar.vue';
import Info from './info/Info.vue';

const meta = {
  title: 'Blocks/Cell/Cell',
  component: Cell,
  tags: ['autodocs'],
  argTypes: {
    hovered: {
      type: 'boolean',
      description:
        'Controls the hover state of the component externally, useful for keyboard navigation',
    },
    multiline: {
      type: 'boolean',
      description: 'Allows for multiline content without truncation',
    },
    is: {
      type: 'string',
      description:
        'Custom component or HTML tag to be used as the root element of the cell, div by default',
    },
    interactiveAnimation: {
      control: 'select',
      options: ['opacity', 'background'],
    },
  },
} satisfies Meta<typeof Cell>;

export default meta;

type Story = StoryObj<typeof Cell>;

export const Default: Story = {
  render: (args) => ({
    components: { Cell, Badge, Avatar },
    setup() {
      return { args };
    },
    template: `
    <Cell v-bind="args">
      <template #default>Title</template>
      <template #subhead>Subhead</template>
      <template #subtitle>Subtitle</template>
      <template #description>Description</template>
      <template #title-badge>
        <Badge type="dot" />
      </template>
      <template #before>
        <Avatar :size="48" src="https://storage.mbredikhin.com/tg-banana.gif" />
      </template>
      <template #after>
        <Badge type="number">99</Badge>
      </template>
    </Cell>`,
  }),
  args: {},
};

export const WithInfo: Story = {
  render: (args) => ({
    components: { Cell, Avatar, Info },
    setup() {
      return { args };
    },
    template: `
    <Cell v-bind="args">
      <template #default>Noah</template>
      <template #subtitle>Yesterday</template>
      <template #before>
        <Avatar :size="48" src="https://storage.mbredikhin.com/dog.png" />
      </template>
      <template #after>
        <Info type="text" subtitle="Received">+1000</Info>
      </template>
    </Cell>`,
  }),
  args: {},
};
