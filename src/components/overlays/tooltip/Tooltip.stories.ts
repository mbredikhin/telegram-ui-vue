import { Button } from '@/components/blocks';
import Tooltip from './Tooltip.vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { ref, useTemplateRef } from 'vue';

const meta = {
  title: 'Overlays/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    controls: {
      exclude: ['anchor', 'customMiddlewares', 'arrowIcon', 'arrowProps'],
    },
  },
  argTypes: {
    mode: {
      control: 'select',
      options: ['light', 'dark'],
      description:
        'Defines the theme of the tooltip, affecting its background and text color.',
    },
    placement: {
      control: 'select',
      options: [
        'top',
        'right',
        'bottom',
        'left',
        'top-start',
        'top-end',
        'right-start',
        'right-end',
        'bottom-start',
        'bottom-end',
        'left-start',
        'left-end',
        'auto',
        'auto-start',
        'auto-end',
      ],
      description:
        'By default, the component will automatically choose the best placement',
    },
    offsetByMainAxis: {
      type: 'number',
      description: 'Offset along the main axis.',
    },
    offsetByCrossAxis: {
      type: 'number',
      description: 'Offset along the cross axis.',
    },
    withArrow: {
      type: 'boolean',
      description:
        'Whether to display an arrow pointing to the anchor element.',
    },
    sameWidth: {
      type: 'boolean',
      description: 'Sets the width to match the target element.',
    },
    autoUpdateOnTargetResize: {
      type: 'boolean',
      description:
        "Opt-in feature to automatically update Popper's position when the target element resizes.",
    },
    is: {
      type: 'string',
      description:
        'Defines the root element type of the Popper, allowing for semantic customization.',
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: (args) => ({
    components: {
      Tooltip,
      Button,
    },
    setup() {
      const anchor = useTemplateRef<HTMLElement | null>('anchor');
      const shown = ref(false);

      return { args, anchor, shown };
    },
    template: `
    <div style="display: flex; align-items: center; justify-content: center; height: 300px">
      <Button style="width: 100px" ref="anchor" @click="shown = !shown">
        {{ shown ? 'Hide' : 'Show' }}
      </Button>
      <Tooltip v-if="shown" v-bind="args" :anchor="anchor">
        Nothing to see here
      </Tooltip>
    </div>`,
    args: {
      mode: 'light',
    },
  }),
};
