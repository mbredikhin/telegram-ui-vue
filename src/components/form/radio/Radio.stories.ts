import { Placeholder } from '@/components/blocks';
import Radio from './Radio.vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { Text } from '@/components/typography';

const meta = {
  title: 'Form/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  render: (args) => ({
    components: { Radio, Placeholder },
    setup() {
      return { args };
    },
    template: `
    <Placeholder>
      <template #description>description="This component wraps input with type=radio, see usage example on the With Cell page"</template>
      <Radio v-bind="args" />
    </Placeholder>`,
  }),
  args: {
    defaultChecked: true,
  },
};

export const WithCells: Story = {
  render: (args) => ({
    components: { Radio, Placeholder, Text },
    setup() {
      return { args };
    },
    template: `
    <form>
      <label style="display: flex; align-items: center; gap: 8px;">
        <Radio name="radio" value="1" v-bind="args" />
        <Text>First radio</Text>
      </label>
      <label style="display: flex; align-items: center; gap: 8px;">
        <Radio name="radio" value="2" v-bind="args" />
        <Text>Second radio</Text>
      </label>
    </form>`,
  }),
  args: {},
};
