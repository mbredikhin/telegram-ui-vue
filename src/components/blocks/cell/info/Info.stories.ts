import type { Meta, StoryObj } from '@storybook/vue3';
import Info from './Info.vue';
import AvatarStack from '../../avatarStack/AvatarStack.vue';
import Avatar from '../../avatar/Avatar.vue';

const meta = {
  title: 'Blocks/Cell/Info',
  component: Info,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'avatarStack'],
      description:
        'Determines the type of content to display, affecting the layout and styling.',
    },
    subtitle: {
      type: 'string',
      description:
        "Text content for the component, utilized when the `type` is set to 'text'.",
    },
  },
} satisfies Meta<typeof Info>;

export default meta;

type Story = StoryObj<typeof Info>;

export const Default: Story = {
  render: (args) => ({
    components: { Info, Avatar },
    setup() {
      return { args };
    },
    template: `
    <div style="display: flex; justify-content: center">
      <Info v-bind="args">
        <template #default>Action</template>
        <template #subtitle>Subtitle</template>
      </Info>
    </div>`,
  }),
  args: {
    type: 'text',
  },
};

export const WithAvatarStack: Story = {
  render: (args) => ({
    components: { Info, AvatarStack, Avatar },
    setup() {
      return { args };
    },
    template: `
    <Info type="avatarStack">
      <template #avatar-stack>
        <AvatarStack>
          <Avatar :size="28" />
          <Avatar :size="28" />
          <Avatar :size="28" />
        </AvatarStack>
      </template>
      <template #default>
        Action
      </template>
    </Info>`,
  }),
  args: {
    type: 'avatarStack',
  },
};
