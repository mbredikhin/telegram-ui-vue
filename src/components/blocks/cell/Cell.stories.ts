import type { Meta, StoryObj } from '@storybook/vue3';
import Cell from './Cell.vue';
import Badge from '../badge/Badge.vue';
import Avatar from '../avatar/Avatar.vue';

const meta = {
  title: 'Blocks/Cell/Cell',
  component: Cell,
  tags: ['autodocs'],
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
        <Avatar size="48" />
      </template>
      <template #after>
        <Badge type="number">99</Badge>
      </template>
    </Cell>
    `,
  }),
  args: {},
};
