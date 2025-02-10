import Placeholder from './Placeholder.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
  title: 'Blocks/Placeholder',
  component: Placeholder,
  tags: ['autodocs'],
} satisfies Meta<typeof Placeholder>;

export default meta;

type Story = StoryObj<typeof Placeholder>;

export const Default: Story = {
  render: (args) => ({
    components: { Placeholder },
    setup() {
      return { args };
    },
    template: `
    <Placeholder v-bind="args" >
      <template #default>
        <img
          alt="Telegram sticker"
          src="https://storage.mbredikhin.com/tg-banana.gif"
          style="width: 120px"
        />
      </template>
      <template #header>${args.header ?? ''}</template>
      <template #description>${args.description ?? ''}</template>
      <template #action>${args.action ?? ''}</template>
    </Placeholder>`,
  }),
  args: {
    header: 'Title',
  },
};

export const WithDescription: Story = {
  render: Default.render,
  args: {
    ...Default.args,
    description: 'Description',
  },
};

export const WithAction: Story = {
  render: Default.render,
  args: {
    ...Default.args,
    description: 'Description',
    action: '<button>Action</button>',
  },
};
