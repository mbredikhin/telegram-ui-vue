import { Section, SectionHeader } from '@/components/blocks';
import Rating from './Rating.vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import Heart28Icon from '@/icons/28/heart.svg?component';
import { Text } from '@/components/typography';

const meta = {
  title: 'Form/Rating',
  component: Rating,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Rating>;

export default meta;

type Story = StoryObj<typeof Rating>;

export const Default: Story = {
  render: (args) => ({
    components: { Section, SectionHeader, Rating, Text },
    setup() {
      return { args };
    },
    template: `
    <Section>
      <template #header>Navigate with keyboard</template>
      <template #footer>Use the keyboard to navigate between the stars and also click on them</template>
      <Rating v-bind="args" />
    </Section>`,
  }),
  args: {},
};

export const WithCustomIcon: Story = {
  render: (args) => ({
    components: {
      Section,
      Rating,
      Heart28Icon,
    },
    setup() {
      return { args };
    },
    template: `
    <Section>
      <template #header>We use custom icon here</template>
      <Rating v-bind="args" />
    </Section>`,
  }),
  args: {
    icon: Heart28Icon,
  },
};
