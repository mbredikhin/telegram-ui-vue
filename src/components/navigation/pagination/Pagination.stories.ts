import type { Meta, StoryObj } from '@storybook/vue3';
import Pagination from './Pagination.vue';

const meta = {
  title: 'Navigation/Pagination',
  component: Pagination,
  tags: ['autodocs'],
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: (args) => ({
    components: { Pagination },
    setup() {
      return { args };
    },
    template: `<Pagination v-bind="args"></Pagination>`,
  }),
  args: {
    boundaryCount: 2,
    count: 4,
    defaultPage: 1,
    hideNextButton: false,
    hidePrevButton: false,
    siblingCount: 1,
  },
};
