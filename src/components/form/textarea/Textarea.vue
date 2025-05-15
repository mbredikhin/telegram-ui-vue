<template>
  <FormInput :status="attrs.status" :class="classes">
    <template #header>
      <slot name="header" />
    </template>

    <TypographyComponent v-bind="attrs" is="textarea" class="textarea">
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
import { computed, TextareaHTMLAttributes, useAttrs } from 'vue';
import FormInput, { FormInputProps } from '../formInput/FormInput.vue';
import { usePlatform } from '@/composables/usePlatform';
import { Subheadline, Text } from '@/components/typography';

/**
 * Wraps a standard HTML textarea element within a `FormInput` container, applying custom styles and functionality.
 * This component inherits the flexible design of the `FormInput`, allowing it to display a header and reflect different status styles.
 * The appearance and behavior of the textarea can be customized through various props, providing a seamless integration with forms.
 */

export interface Attrs
  extends Omit<FormInputProps, 'value'>,
    TextareaHTMLAttributes {}

export interface TextareaProps extends /* @vue-ignore */ Attrs {}

defineProps<TextareaProps>();

defineSlots<{
  /** Textarea content. */
  ['default'](props?: unknown): unknown;
  /** Optional header content, displayed above the form input on `base` platform. */
  header(props?: unknown): unknown;
}>();

const platform = usePlatform();
const attrs: Attrs = useAttrs();

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
