import type { Meta, StoryObj } from '@storybook/vue3';
import ButtonCell from './ButtonCell.vue';
import { List, Section } from '@/components/blocks';
import ProfileColoredSquare32Icon from '@/icons/32/profile_colored_square.svg';
import AddCircle28Icon from '@/icons/28/add_circle.svg';
import { Component } from 'vue';
import Cell from '../Cell.vue';

const meta = {
  title: 'Blocks/Cell/ButtonCell',
  component: ButtonCell,
  tags: ['autodocs'],
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
      ProfileColoredSquare32Icon:
        ProfileColoredSquare32Icon as unknown as Component,
      AddCircle28Icon: AddCircle28Icon as unknown as Component,
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
    </div>
    `,
  }),
  args: {},
};
