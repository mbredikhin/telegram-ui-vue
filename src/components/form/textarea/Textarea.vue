<template>
  <FormInput :status="props.status" :class="classes">
    <template #header>
      <slot name="header" />
    </template>

    <TypographyComponent is="textarea" class="textarea" v-bind="attrs">
      <slot />
    </TypographyComponent>
  </FormInput>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import FormInput from '../formInput/FormInput.vue';
import { usePlatform } from '@/composables/usePlatform';
import { Subheadline, Text } from '@/components/typography';

/**
 * Wraps a standard HTML textarea element within a `FormInput` container, applying custom styles and functionality.
 * This component inherits the flexible design of the `FormInput`, allowing it to display a header and reflect different status styles.
 * The appearance and behavior of the textarea can be customized through various props, providing a seamless integration with forms.
 */

export interface TextareaProps {
  /** Defines the visual state of the form input (e.g., error, focused). */
  status?: 'default' | 'error' | 'focused';
  /** Indicates if the form input is disabled. */
  disabled?: boolean;
  type?: string;
}

const props = withDefaults(defineProps<TextareaProps>(), {
  status: 'default',
  disabled: false,
  type: 'text',
});

defineSlots<{
  /** Textarea content. */
  ['default'](props?: unknown): unknown;
  /** Optional header content, displayed above the form input on `base` platform. */
  header(props?: unknown): unknown;
}>();

const platform = usePlatform();
const attrs = useAttrs();

const classes = computed(() => ({
  ['textarea-wrapper']: true,
  ['textarea-wrapper--ios']: platform === 'ios',
}));

const TypographyComponent = computed(() =>
  platform === 'ios' ? Text : Subheadline
);
</script>

<style lang="scss" scoped>
.textarea {
  padding: 12px 16px;
  min-height: 80px;
  width: 100%;
  resize: none;
  color: var(--tgui-text-color);
  outline: none;
  border: none;
  background: inherit;
  border-radius: inherit;
}

.textarea::placeholder {
  color: var(--tgui-secondary-hint-color);
}

.textarea-wrapper--ios .textarea {
  padding: 16px;
  min-height: 84px;
}
</style>
