<template>
  <div>
    <slot />
    <ButtonCell is="label">
      <template #before>
        <Attach28Icon />
      </template>
      <VisuallyHidden>
        <input type="file" :placeholder="props.label" v-bind="attrs" />
      </VisuallyHidden>
      {{ props.label }}
    </ButtonCell>
  </div>
</template>

<script setup lang="ts">
import { ButtonCell } from '@/components/blocks';
import { VisuallyHidden } from '@/components/service';
import { InputHTMLAttributes, useAttrs } from 'vue';
import Attach28Icon from '@/icons/28/attach.svg';

/**
 * Renders a file input disguised as a button, enhancing the user interface and improving usability.
 * It leverages the `ButtonCell` component for consistent styling across the application.
 */

export interface FileInputProps extends /* @vue-ignore */ InputHTMLAttributes {
  /** Text label for the file input, used as the button label. */
  label?: string;
}

const props = withDefaults(defineProps<FileInputProps>(), {
  label: 'Attach file',
});

const attrs = useAttrs();
</script>
