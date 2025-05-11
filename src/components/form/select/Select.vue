<template>
  <FormInput :status="props.status" :class="classes">
    <template #header>
      <slot name="header" />
    </template>
    <template #before>
      <slot name="before" />
    </template>

    <TypographyComponent
      is="select"
      class="select"
      :multiple="false"
      v-bind="attrs"
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
import { computed, useAttrs } from 'vue';
import FormInput from '../formInput/FormInput.vue';
import { usePlatform } from '@/composables/usePlatform';
import { Subheadline, Text } from '@/components/typography';
import ChevronDown20Icon from '@/icons/20/chevron-down.svg';

/**
 * Renders a custom styled select input within a `FormInput` container. This component is designed to integrate seamlessly
 * with the form input styles, providing a consistent look and enhanced features such as a custom dropdown arrow and support
 * for platform-specific typography. The `FormInput` wrapper facilitates the inclusion of headers and status messages.
 */

export interface SelectProps {
  /** Defines the visual state of the form input (e.g., error, focused). */
  status?: 'default' | 'error' | 'focused';
  /** Indicates if the form input is disabled. */
  disabled?: boolean;
}

const props = withDefaults(defineProps<SelectProps>(), {
  status: 'default',
  disabled: false,
});

defineSlots<{
  /** Typically `option` elements to be rendered within the select. */
  ['default'](props?: unknown): unknown;
  /** Optional header content, displayed above the form input on `base` platform. */
  header(props?: unknown): unknown;
  /** Content to be displayed before the form input, such as icons or labels. */
  before(props?: unknown): unknown;
}>();

const platform = usePlatform();
const attrs = useAttrs();

const classes = computed(() => ({
  ['select-wrapper']: true,
  ['select-wrapper--ios']: platform === 'ios',
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
