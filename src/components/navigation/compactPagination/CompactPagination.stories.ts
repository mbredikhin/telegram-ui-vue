import CompactPagination from './CompactPagination.vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import CompactPaginationItem from './CompactPaginationItem.vue';
import { ref } from 'vue';

const meta = {
  title: 'Navigation/CompactPagination',
  component: CompactPagination,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['default', 'ambient', 'white'],
      description: 'Sets the color theme of the pagination.',
    },
  },
} satisfies Meta<typeof CompactPagination>;

export default meta;

type Story = StoryObj<typeof CompactPagination>;

export const Default: Story = {
  render: (args) => ({
    components: { CompactPagination, CompactPaginationItem },
    setup() {
      const paginationItems = Array.from({ length: 8 }, (_, i) => i + 1);
      const selected = ref(1);
      return { args, paginationItems, selected };
    },
    template: `
    <div :style="{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '20px',
      background: args.mode === 'white' ? 'var(--tgui-black)' : 'var(--tgui-secondary-bg-color)'
    }">
      <CompactPagination v-bind="args">
        <CompactPaginationItem
          v-for="item of paginationItems"
          :key="item"
          :selected="item === selected"
          @click="selected = item"
        >
          {{ item }}
        </CompactPaginationItem>
      </CompactPagination>
    </div>`,
  }),
};
