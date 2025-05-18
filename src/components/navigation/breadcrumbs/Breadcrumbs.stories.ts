import Breadcrumbs from './Breadcrumbs.vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import BreadcrumbsItem from './BreadcrumbsItem.vue';

const meta = {
  title: 'Navigation/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
  argTypes: {
    divider: {
      control: 'select',
      options: ['dot', 'slash', 'chevron'],
    },
  },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;

type Story = StoryObj<typeof Breadcrumbs>;

export const Default: Story = {
  render: (args) => ({
    components: { Breadcrumbs, BreadcrumbsItem },
    setup() {
      return { args };
    },
    template: `
    <Breadcrumbs v-bind="args">
      <BreadcrumbsItem>First</BreadcrumbsItem>
      <BreadcrumbsItem>Second</BreadcrumbsItem>
      <BreadcrumbsItem>Third</BreadcrumbsItem>
    </Breadcrumbs>`,
  }),
  args: {
    divider: 'dot',
  },
};

export const Link: Story = {
  render: (args) => ({
    components: { Breadcrumbs, BreadcrumbsItem },
    setup() {
      return { args };
    },
    template: `
    <Breadcrumbs v-bind="args">
      <BreadcrumbsItem is="a" href="https://nohello.net/en/" target="_blank" rel="noreferrer">No</BreadcrumbsItem>
      <BreadcrumbsItem is="a" href="https://nohello.net/en/" target="_blank" rel="noreferrer">Hello</BreadcrumbsItem>
      <BreadcrumbsItem is="a" href="https://nohello.net/en/" target="_blank" rel="noreferrer">Ok?</BreadcrumbsItem>
    </Breadcrumbs>`,
  }),
  args: {
    divider: 'dot',
  },
};
