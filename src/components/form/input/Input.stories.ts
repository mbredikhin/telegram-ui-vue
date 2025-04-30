import { List } from '@/components/blocks';
import Input from './Input.vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import Close24Icon from '@/icons/24/close.svg';
import { Tappable } from '@/components/service';
import { Component } from 'vue';

const meta = {
  title: 'Form/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: (args) => ({
    components: {
      Input,
      List,
      Tappable,
      Close24Icon: Close24Icon as unknown as Component,
    },
    setup() {
      return { args };
    },
    template: `
    <List style="width: 400px; max-width: 100%; margin: auto; background: var(--tgui-secondary-bg-color);">
        <Input
          placeholder="I am usual input, just leave me alone"
        >
          <template #header>Input</template>
        </Input>
        <Input
          status="error"
          placeholder="I am error input, don't make my mistakes..."
        >
          <template #header>Input</template>
        </Input>
        <Input
          status="focused"
          placeholder="I am focused input, are u focused on me?"
        >
          <template #header>Input</template>
        </Input>
        <Input
          disabled
          placeholder="I am disabled input"
        >
          <template #header>Input</template>
        </Input>
        <Input
          status="focused"
          placeholder="Write and clean me"
          :value="args.value"
          @change="(e) => { args.value = e.target.value; }"
        >
          <template #header>Input</template>
          <template #after>
            <Tappable
              style="display: flex"
              @click="args.value = ''"
            >
              <Close24Icon />
            </Tappable>
          </template>
        </Input>
      </List>`,
  }),
  args: {
    value: '',
  },
};
