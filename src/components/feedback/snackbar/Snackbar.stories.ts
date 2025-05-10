import Snackbar from './Snackbar.vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import Archive28Icon from '@/icons/28/archive.svg';
import { Component, ref } from 'vue';
import SnackbarButton from './SnackbarButton.vue';
import { Link } from '@/components/navigation';
import { Button } from '@/components/blocks';

const meta = {
  title: 'Feedback/Snackbar',
  component: Snackbar,
  tags: ['autodocs'],
  argTypes: {
    duration: {
      type: 'number',
      description:
        'The duration in milliseconds after which the snackbar will automatically close.',
    },
  },
} satisfies Meta<typeof Snackbar>;

export default meta;

type Story = StoryObj<typeof Snackbar>;

export const Default: Story = {
  render: (args) => ({
    components: {
      Snackbar,
      SnackbarButton,
      Button,
      Link,
      Archive28Icon: Archive28Icon as unknown as Component,
    },
    setup() {
      const isDeleteSnackbarShown = ref(false);
      const isUndoSnackbarShown = ref(false);

      return {
        args,
        isDeleteSnackbarShown,
        isUndoSnackbarShown,
      };
    },
    template: `
    <Button size="m" @click="isDeleteSnackbarShown = true">Show snackbar</Button>
    <Snackbar
      v-if="isDeleteSnackbarShown"
      v-bind="args"
      @close="isDeleteSnackbarShown = false"
    >
      <template #before>
        <Archive28Icon />
      </template>
      <template #after>
        <SnackbarButton @click="isUndoSnackbarShown = true">
          Undo
        </SnackbarButton>
      </template>
      <template #description>
        Restore the message within 4 seconds
      </template>
      Message deleted
    </Snackbar>
      
    <Snackbar
      v-if="isUndoSnackbarShown"
      v-bind="args"
      @close="isUndoSnackbarShown = false"
    >
      <template #description>
        Message returned to the list
      </template>
      <template #link>
        <Link href="https://telegram.org" target="_blank">Open</Link>
      </template>
      Message restored
    </Snackbar>`,
  }),
  args: {},
};
