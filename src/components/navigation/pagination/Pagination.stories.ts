import type { Meta, StoryObj } from '@storybook/vue3';
import Pagination from './Pagination.vue';
import { ref, watch } from 'vue';

const meta = {
  title: 'Navigation/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    boundaryCount: {
      type: 'number',
      description: 'Number of always visible pages at the beginning and end.',
    },
    count: {
      type: 'number',
      description: 'The total number of pages.',
    },
    defaultPage: {
      type: 'number',
      description:
        'The page selected by default when the component is uncontrolled',
    },
    hideNextButton: {
      type: 'boolean',
      description: 'If `true`, hide the next-page button.',
    },
    hidePrevButton: {
      type: 'boolean',
      description: 'If `true`, hide the previous-page button.',
    },
    page: {
      type: 'number',
      description: 'The current page.',
    },
    siblingCount: {
      type: 'number',
      description:
        'Number of always visible pages before and after the current page.',
    },
    disabled: {
      type: 'boolean',
      description: 'Controls whether the Pagination component is interactive.',
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: (args) => ({
    components: { Pagination },
    setup() {
      const page = ref(args.page);

      watch(
        () => args.page,
        (value) => (page.value = value)
      );

      function changePage(value: number) {
        page.value = value;
      }

      return {
        args,
        page,
        changePage,
      };
    },
    template: `<Pagination v-bind="args" :page="page" @change="changePage"></Pagination>`,
  }),
  args: {
    boundaryCount: 2,
    count: 4,
    defaultPage: 1,
    hideNextButton: false,
    hidePrevButton: false,
    siblingCount: 1,
    disabled: false,
  },
};
