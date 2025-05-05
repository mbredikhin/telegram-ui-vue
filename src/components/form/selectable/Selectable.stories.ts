import { Cell, Placeholder } from '@/components/blocks';
import Selectable from './Selectable.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
  title: 'Form/Selectable',
  component: Selectable,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Selectable>;

export default meta;

type Story = StoryObj<typeof Selectable>;

export const Default: Story = {
  render: (args) => ({
    components: { Placeholder, Selectable },
    setup() {
      return { args };
    },
    template: `
    <Placeholder>
      <template #description>This component wraps input with type=radio, see usage example on the With Cell page</template>
      <Selectable v-bind="args" />
    </Placeholder>`,
  }),
  args: {
    defaultChecked: true,
  },
};

export const WithCell: Story = {
  render: (args) => ({
    components: { Cell, Selectable },
    setup() {
      return { args };
    },
    template: `
    <form>
      <Cell
        is="label"
        multiline
      >
        <template #description>Pass is='label' to Cell to make it clickable.</template>
        <template #before>
          <Selectable 
            defaultChecked 
            name="group" 
            value="1" 
          />
        </template>
        First radio
      </Cell>
      <Cell
        is="label"
        multiline
      >
        <template #description>Pass is='label' to Cell to make it clickable.</template>
        <template #before>
          <Selectable 
            name="group" 
            value="2"
          />
        </template>
        Second radio
      </Cell>
    </form>`,
  }),
  args: {},
};
