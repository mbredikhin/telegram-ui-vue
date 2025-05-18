import { Button, Placeholder } from '@/components/blocks';
import Popper from './Popper.vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { Caption } from '@/components/typography';
import { ref } from 'vue';
import { VirtualElement } from '@floating-ui/vue';

const meta = {
  title: 'Overlays/Popper',
  component: Popper,
  tags: ['autodocs'],
  parameters: {
    controls: {
      exclude: ['anchor', 'customMiddlewares', 'arrowIcon', 'arrowProps'],
    },
  },
  argTypes: {
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
} satisfies Meta<typeof Popper>;

export default meta;

type Story = StoryObj<typeof Popper>;

export const Default: Story = {
  render: (args) => ({
    components: {
      Popper,
      Button,
      Placeholder,
      Caption,
    },
    setup() {
      const anchor = ref<VirtualElement | null>(null);

      function onClick({ clientX, clientY }: MouseEvent) {
        anchor.value = {
          getBoundingClientRect() {
            return {
              width: 10,
              height: 10,
              x: clientX,
              y: clientY,
              top: clientY,
              left: clientX,
              right: clientX,
              bottom: clientY,
            };
          },
        };
      }

      return { args, anchor, onClick };
    },
    template: `
    <Placeholder
      style="position: relative; height: 40vh; display: flex; align-items: center; justify-content: center"
      @click="onClick"
    >
      <template #header>Click anywhere in this window</template>
      <template #description>
        A low-level component for rendering a dropdown block. It's positioning itself correctly next to the target element.
      </template>

      <Popper
        v-bind="args"
        style="padding: 10px 12px; background: var(--tgui-button-color); color: var(--tgui-white); border-radius: 4px"
        :anchor="anchor"
        :arrowProps="{ style: 'color: var(--tgui-button-color)' }"
      >
        <Caption level="1">Hello</Caption>
      </Popper>
    </Placeholder>`,
  }),
};
