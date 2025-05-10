import type { Meta, StoryObj } from '@storybook/vue3';
import Navigation from './Navigation.vue';

const meta = {
  title: 'Blocks/Cell/Navigation',
  component: Navigation,
  tags: ['autodocs'],
} satisfies Meta<typeof Navigation>;

export default meta;

type Story = StoryObj<typeof Navigation>;

export const Default: Story = {
  render: (args) => ({
    components: { Navigation },
    setup() {
      return { args };
    },
    template: `
    <div style="display: flex; justify-content: center">
      <Navigation v-bind="args">
        <template #default>Action</template>
      </Navigation>
    </div>`,
  }),
  args: {},
};
