import Button from './Button.vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import Copy20Icon from '@/icons/20/copy.svg?component';
import PersonRemove24Icon from '@/icons/24/person-remove.svg?component';

const meta = {
  title: 'Blocks/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    controls: {
      include: ['size', 'stretched', 'mode', 'loading', 'disabled', 'is'],
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['s', 'm', 'l'],
      description:
        'Controls the size of the button, influencing padding and font size.',
    },
    stretched: {
      type: 'boolean',
      description:
        'If true, stretches the button to fill the width with its container.',
    },
    mode: {
      control: 'select',
      options: ['filled', 'bezeled', 'plain', 'gray', 'outline', 'white'],
      description:
        "Defines the button's visual style, affecting its background and text color.",
    },
    loading: {
      type: 'boolean',
      description:
        'Displays a loading indicator in place of the button content when true.',
    },
    disabled: {
      type: 'boolean',
      description:
        'Disables the button, preventing user interactions, when true.',
    },
    is: {
      type: 'string',
      description:
        'Specifies the root element type for the button, allowing for semantic customization or integration with routing libraries.',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: `
    <Button v-bind="args">
      ${args.default}
    </Button>
    `,
  }),
  args: {
    size: 's',
    mode: 'filled',
    default: 'Action',
  },
};

export const WithIcon: Story = {
  render: (args) => ({
    components: {
      Button,
      Copy20Icon,
      PersonRemove24Icon,
    },
    setup() {
      return { args };
    },
    template: `
    <Button v-bind="args">
      <template #before>
        <Copy20Icon v-if="args.size === 's'" />
        <PersonRemove24Icon v-else />
      </template>
      ${args.default}
    </Button>
    `,
  }),
  args: {
    size: 's',
    mode: 'filled',
    default: 'Create channel',
  },
};

export const Link: Story = {
  render: (args) => ({
    components: {
      Button,
    },
    setup() {
      return { args };
    },
    template: `
    <Button v-bind="args">
      ${args.default}
    </Button>
    `,
  }),
  args: {
    size: 's',
    mode: 'filled',
    default: 'No hello',
    // @ts-expect-error Its implied when we change root component, arg types being changed accordingly
    target: '_blank',
    href: 'https://nohello.net/en/',
    is: 'a',
  },
};
