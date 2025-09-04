<template>
  <FormInput data-test-id="select" :status="attrs.status" :class="classes">
    <template #header>
      <slot name="header" />
    </template>
    <template #before>
      <slot name="before" />
    </template>

    <TypographyComponent
      is="select"
      class="select"
      v-bind="attrs"
      :multiple="false"
    >
      <slot />
    </TypographyComponent>
    <ChevronDown20Icon aria-hidden class="chevron" />
  </FormInput>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { computed, SelectHTMLAttributes, useAttrs, VNode } from 'vue';
import FormInput, { FormInputProps } from '../formInput/FormInput.vue';
import { usePlatform } from '@/composables/usePlatform';
import { Subheadline, Text } from '@/components/typography';
import ChevronDown20Icon from '@/icons/20/chevron-down.svg';

/**
 * Renders a custom styled select input within a `FormInput` container. This component is designed to integrate seamlessly
 * with the form input styles, providing a consistent look and enhanced features such as a custom dropdown arrow and support
 * for platform-specific typography. The `FormInput` wrapper facilitates the inclusion of headers and status messages.
 */

export interface Attrs extends FormInputProps, SelectHTMLAttributes {}

export interface SelectProps extends /* @vue-ignore */ Attrs {}

defineProps<SelectProps>();

defineSlots<{
  /** Typically `option` elements to be rendered within the select. */
  default?: () => VNode[];
  /** Optional header content, displayed above the form input on `base` platform. */
  header?: () => VNode[];
  /** Content to be displayed before the form input, such as icons or labels. */
  before?: () => VNode[];
}>();

const platform = usePlatform();
const attrs: FormInputProps = useAttrs();

const classes = computed(() => ({
  'select-wrapper': true,
  'select-wrapper--ios': platform === 'ios',
  [String(attrs.class)]: !!attrs.class,
}));

const TypographyComponent = computed(() =>
  platform === 'ios' ? Text : Subheadline
);
</script>

<style lang="scss" scoped>
.select-wrapper {
  position: relative;
}

.select {
  appearance: none;
  padding: 12px 58px 12px 16px;
  width: 100%;
  border: none;
  color: var(--tgui-text-color);
  outline: none;
  border-radius: inherit;
  background: inherit;
}

.chevron {
  position: absolute;
  top: 53%;
  right: 40px;
  transform: translateY(-50%);
  color: var(--tgui-secondary-hint-color);
  pointer-events: none;
}
</style>
