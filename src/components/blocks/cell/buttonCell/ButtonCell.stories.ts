import type { Meta, StoryObj } from '@storybook/vue3';
import ButtonCell from './ButtonCell.vue';
import { List, Section } from '@/components/blocks';
import ProfileColoredSquare32Icon from '@/icons/32/profile-colored-square.svg?component';
import AddCircle28Icon from '@/icons/28/add-circle.svg?component';
import Cell from '../Cell.vue';

const meta = {
  title: 'Blocks/Cell/ButtonCell',
  component: ButtonCell,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['default', 'destructive'],
      description:
        "Determines the button cell's visual theme, influencing color and style.",
    },
    is: {
      type: 'string',
      description:
        'Specifies the root element type for more semantic HTML structure or integration with navigation libraries.',
    },
  },
} satisfies Meta<typeof ButtonCell>;

export default meta;

type Story = StoryObj<typeof ButtonCell>;

export const Default: Story = {
  render: (args) => ({
    components: {
      ButtonCell,
      List,
      Section,
      Cell,
      ProfileColoredSquare32Icon,
      AddCircle28Icon,
    },
    setup() {
      return { args };
    },
    template: `
    <div style="width: 450px; display: flex; justify-content: center">
      <List style="background: var(--tgui-secondary-bg-color); padding: 10px">
        <Section>
          <Cell>
            <template #before>
              <ProfileColoredSquare32Icon />
            </template>
            <template #subtitle>
              Manage ads and payment settings
            </template>
            My Ads
          </Cell>
          <ButtonCell v-bind="args">
            <template #before>
              <AddCircle28Icon />
            </template>
            Create Ad
          </ButtonCell>
        </Section>
      </List>
    </div>`,
  }),
  args: {},
};
