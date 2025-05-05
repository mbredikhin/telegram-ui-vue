import { Button } from '@/components/blocks';
import Tooltip from './Tooltip.vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { ref, useTemplateRef } from 'vue';

const meta = {
  title: 'Overlays/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
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
    attrs: {
      mode: 'light',
    },
  }),
};
