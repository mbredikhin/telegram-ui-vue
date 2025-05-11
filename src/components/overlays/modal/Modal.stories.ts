import Modal from './Modal.vue';
import type { Decorator, Meta, StoryObj } from '@storybook/vue3';
import ModalHeader from './ModalHeader.vue';
import { Button, Placeholder } from '@/components/blocks';
import ModalClose from './ModalClose.vue';
import Close28Icon from '@/icons/28/close.svg?component';
import { ref } from 'vue';

const meta = {
  title: 'Overlays/Modal',
  component: Modal,
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof Modal>;

const DecoratorFullScreen: Decorator = () => ({
  template: `
  <div style="display: flex; align-items: center; justify-content: center; height: 600px; max-height: 96vh">
    <story />
  </div>`,
});

export const Default: Story = {
  render: (args) => ({
    components: {
      Modal,
      ModalHeader,
      ModalClose,
      Button,
      Placeholder,
      Close28Icon,
    },
    setup() {
      return { args };
    },
    template: `
    <Modal v-bind="args">
      <template #header>${args.header ?? ''}</template>
      <template #trigger>${args.trigger ?? ''}</template>
      <template #default>${args.default ?? ''}</template>
    </Modal>`,
  }),
  decorators: [DecoratorFullScreen],
  args: {
    header: '<ModalHeader>Only iOS header</ModalHeader>',
    trigger: '<Button size="m">Open modal</Button>',
    default: `
    <Placeholder>
      <template #header>Title</template>
      <template #description>Description</template>
      <img
        alt="Telegram sticker"
        src="https://storage.mbredikhin.com/tg-banana.gif"
        style="display: block; width: 144px; height: 144px"
      />
    </Placeholder>`,
  },
};

export const NestedModals: Story = {
  render: Default.render,
  decorators: [DecoratorFullScreen],
  args: {
    ...Default.args,
    default: `
    <Placeholder>
      <template #header>Title</template>
      <template #description>Description</template>
      <template #action>
        <Modal v-bind="args" nested>
          <template #header>${Default.args!.header ?? ''}</template>
          <template #trigger>${Default.args!.trigger ?? ''}</template>
          <template #default>${Default.args!.default ?? ''}</template>
        </Modal>
      </template>
    </Placeholder>`,
  },
};

export const WithCloseButton: Story = {
  render: Default.render,
  decorators: [DecoratorFullScreen],
  args: {
    ...Default.args,
    header: `
    <ModalHeader>
      Only iOS header
      <template #after>
        <ModalClose>
          <Close28Icon style="color: var(--tgui-plain-foreground)" />
        </ModalClose>
      </template>
    </ModalHeader>`,
  },
};

export const WithSnapPoints: Story = {
  render: Default.render,
  decorators: [DecoratorFullScreen],
  args: {
    ...Default.args,
    default: `
      <div style="height: 33vh; background: blue"></div>
      <div style="height: 33vh; background: green"></div>
      <div style="height: 33vh; background: bisque"></div>`,
    snapPoints: [0.33, 0.66, 1],
  },
};

export const Controlled: Story = {
  render: (args) => ({
    components: {
      Modal,
      ModalHeader,
      ModalClose,
      Button,
      Placeholder,
      Close28Icon,
    },
    setup() {
      const isOpen = ref(args.open);
      const isFetching = ref(false);

      function fetchAndClose() {
        isFetching.value = true;
        setTimeout(() => {
          isFetching.value = false;
          isOpen.value = false;
        }, 1000);
      }

      return { args, isOpen, isFetching, fetchAndClose };
    },
    template: `
    <Placeholder>
      <template #header>This modal will be closed after 1 second</template>
      <template #description>Click open and then fetch data</template>
      <template #action>
        <Button size="m" @click="isOpen = true">Open</Button>
      </template>
      <Modal
        v-bind="args"
        :open="isOpen"
        @change:open="isOpen = $event"
      >
        <template #header>${args.header ?? ''}</template>
        <Placeholder>
          <template #action>
            <Button
              size="m"
              :loading="isFetching"
              @click="fetchAndClose"
            >
              Fetch data and close
            </Button>
          </template>
        </Placeholder>
      </Modal>
    </Placeholder>`,
  }),
  decorators: [DecoratorFullScreen],
  args: {
    ...Default.args,
  },
};
