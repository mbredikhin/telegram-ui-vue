import SectionHeader from './SectionHeader.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
  title: 'Blocks/Section/SectionHeader',
  component: SectionHeader,
  tags: ['autodocs'],
  argTypes: {
    large: {
      type: 'boolean',
      description: 'Large title, changes font size, padding and color',
    },
  },
} satisfies Meta<typeof SectionHeader>;

export default meta;

type Story = StoryObj<typeof SectionHeader>;

export const Default: Story = {
  render: (args) => ({
    components: { SectionHeader },
    setup() {
      return { args };
    },
    template: `
    <div>
      <SectionHeader v-bind="args">${args.default || 'Usual title'}</SectionHeader>
      <SectionHeader large v-bind="args">${args.default || 'Large title'}</SectionHeader>
    </div>`,
  }),
  args: {},
};
