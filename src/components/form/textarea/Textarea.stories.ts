import { List } from '@/components/blocks';
import Textarea from './Textarea.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
  title: 'Form/Textarea',
  component: Textarea,
  tags: ['autodocs'],
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  render: (args) => ({
    components: { List, Textarea },
    setup() {
      return { args };
    },
    template: `
    <List style="width: 240px; background: var(--tgui-secondary-bg-color);">
      <Textarea placeholder="I am usual textarea">
        <template #header>Textarea</template>
      </Textarea>
    </List>`,
  }),
};
