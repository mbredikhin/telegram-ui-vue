import SectionFooter from './SectionFooter.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
  title: 'Blocks/Section/SectionFooter',
  component: SectionFooter,
  tags: ['autodocs'],
  argTypes: {
    centered: {
      type: 'boolean',
      description: 'Centering text, adding additional indents',
    },
  },
} satisfies Meta<typeof SectionFooter>;

export default meta;

type Story = StoryObj<typeof SectionFooter>;

export const Default: Story = {
  render: (args) => ({
    components: { SectionFooter },
    setup() {
      return { args };
    },
    template: `
    <div style="background: var(--tgui-secondary-bg-color)">
      <SectionFooter v-bind="args">
        SectionFooter
      </SectionFooter>
    </div>`,
  }),
  args: {},
};
