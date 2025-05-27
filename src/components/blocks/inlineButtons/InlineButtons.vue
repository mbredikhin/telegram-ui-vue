<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, provide, VNode } from 'vue';
import { InlineButtonsInjection, inlineButtonsInjectionKey } from './lib';
import { usePlatform } from '@/composables/usePlatform';

/**
 * `InlineButtons` acts as a container for `InlineButtonsItem` components. This component
 * provides a unified context for styling and interaction, leveraging the `mode` to apply
 * consistent styling across all child components. It ensures visual consistency across different
 * platforms and supports custom styling modes.
 */

export interface InlineButtonsProps {
  /** Dictates the styling mode for the inline buttons, affecting color and background. */
  mode?: InlineButtonsInjection['mode'];
}

const props = defineProps<InlineButtonsProps>();

defineSlots<{
  /**
   * Should be a list of `InlineButtonsItem` components. Each child will inherit the `mode`
   * from this parent, ensuring consistent styling across all items.
   */
  default?: () => VNode[];
}>();

const platform = usePlatform();

const classes = computed(() => ({
  ['inline-buttons']: true,
  ['inline-buttons--ios']: platform === 'ios',
}));

const inlineButtonsInjection = computed<InlineButtonsInjection>(() => ({
  mode: props.mode,
}));

provide(inlineButtonsInjectionKey, inlineButtonsInjection);
</script>

<style lang="scss" scoped>
.inline-buttons {
  display: flex;
  gap: 12px;
}

.inline-buttons--ios {
  gap: 8px;
}
</style>
