import Image from './Image.vue';
import ImageBadge from './ImageBadge.vue';
import Quote12Icon from '@/icons/12/quote.svg';
import Stats28Icon from '@/icons/28/stats.svg';
import type { Meta, StoryObj } from '@storybook/vue3';
import { Component } from 'vue';

const meta = {
  title: 'Blocks/Image',
  component: Image,
  tags: ['autodocs'],
  parameters: {
    controls: { include: ['size', 'src'] },
  },
  argTypes: {
    size: {
      control: 'select',
      options: [20, 24, 28, 40, 48, 96],
    },
  },
} satisfies Meta<typeof Image>;

export default meta;

type Story = StoryObj<typeof Image>;

const Default: Story = {
  render: (args) => ({
    components: { Image, ImageBadge },
    setup() {
      return { args };
    },
    template: `
    <Image v-bind="args">
      <template #default>${args['default'] ?? ''}</template>
      <template #fallback-icon>${args['fallback-icon'] ?? ''}</template>
    </Image>`,
  }),
  args: {},
};

export const ValidImage: Story = {
  render: Default.render,
  args: {
    size: 96,
    src: 'https://avatars.githubusercontent.com/u/16864992?v=4',
  },
};

export const InvalidImage: Story = {
  render: Default.render,
  args: {
    size: 96,
    src: 'https://avatars.gitontent.com/u/16864992?v=4',
  },
};

export const WithFallback: Story = {
  render: Default.render,
  args: {
    size: 96,
    src: 'https://avatars.gitontent.com/u/16864992?v=4',
    ['fallback-icon']: '<span>😕</span>',
  },
};

export const WithBadge: Story = {
  render: (args) => ({
    components: { Image, ImageBadge },
    setup() {
      return { args };
    },
    template: `
    <Image v-bind="args">
      <ImageBadge type="number">42</ImageBadge>
    </Image>`,
  }),
  args: {
    size: 96,
    src: 'https://avatars.githubusercontent.com/u/16864992?v=4',
    ['fallback-icon']: '<span>😕</span>',
  },
};

export const WithChildren: Story = {
  render: (args) => ({
    components: {
      Image,
      Quote12Icon: Quote12Icon as unknown as Component,
      Stats28Icon: Stats28Icon as unknown as Component,
    },
    setup() {
      return { args };
    },
    template: `
    <Image v-bind="args">
      <Quote12Icon v-if="(args?.size || 0) <= 28" />
      <Stats28Icon v-else />
    </Image>`,
  }),
  args: {
    size: 48,
  },
};
