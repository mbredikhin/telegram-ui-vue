import type { Meta, StoryObj } from '@storybook/vue3';
import Card from './Card.vue';
import CardChip from './CardChip.vue';
import CardCell from './CardCell.vue';

const meta = {
  title: 'Blocks/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['plain', 'ambient'],
      description:
        'Defines the visual style of the card, influencing background, shadow, and border.',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: (args) => ({
    components: { Card, CardCell, CardChip },
    setup() {
      return { args };
    },
    template: `
    <Card v-bind="args">
      <CardChip :readonly="true">Hot place</CardChip>
      <img
        alt="NY"
        src="https://i.imgur.com/892vhef.jpeg"
        style="display: block; width: 254px; height: 308px; object-fit: cover"
      />
      <CardCell :readonly="true">
        <template #subtitle>United states</template>
        New York
      </CardCell>
    </Card>`,
  }),
  args: {},
};
