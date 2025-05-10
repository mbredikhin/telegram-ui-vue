import Button from '../button/Button.vue';
import Image from '../image/Image.vue';
import List from '../list/List.vue';
import Banner from './Banner.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta = {
  title: 'Blocks/Banner',
  component: Banner,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['section', 'inline'],
      description:
        "Specifies the banner's layout style, which can affect its positioning and styling.",
    },
    showCloseIcon: {
      type: 'boolean',
      description: 'Specifies whether to show the close icon or not.',
    },
  },
} satisfies Meta<typeof Banner>;

export default meta;

type Story = StoryObj<typeof Banner>;

export const Default: Story = {
  render: (args) => ({
    components: { Banner, Image, Button },
    setup() {
      return { args };
    },
    template: `
    <Banner v-bind="args" @close="() => console.log('clicked on close icon')">
      <template #before>
        <Image :size="48" />
      </template>
      <template #callout>
        Urgent notification
      </template>
      <template #header>
        Introducing TON Space
      </template>
      <template #description>
        Start exploring TON in a new, better way
      </template>
      <Button size="s">Try it out</Button>
      <Button size="s" mode="plain">Maybe later</Button>
    </Banner>`,
  }),
  args: {
    showCloseIcon: true,
    type: 'section',
  },
};

export const WithImageBackground: Story = {
  render: (args) => ({
    components: { Banner, Button, List },
    setup() {
      return { args };
    },
    template: `
    <List style="background: var(--tgui-secondary-bg-color)">
      <Banner v-bind="args">
        <template #background>
          <img
            alt="Nasa streams"
            style="width: 150%"
            src="https://www.nasa.gov/wp-content/uploads/2023/10/streams.jpg?resize=1536,864"
          />
        </template>
        <template #header>
          Introducing TON Space
        </template>
        <template #subheader>
          Start exploring TON in a new, better way
        </template>
        <Button size="s" mode="white">Try it out</Button>
      </Banner>
    </List>`,
  }),
  args: {
    type: 'section',
  },
};
