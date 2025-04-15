<template>
  <component :is="props.is" :class="classes">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue';

/**
 * This component provides a flexible way to create a layout that is fixed to either the top or bottom of its parent container.
 * It's useful for creating headers, footers, or any element that should remain in view regardless of the scrolling content.
 */

export interface FixedLayoutProps {
  /** The component type to render, allowing for semantic HTML use. Defaults to 'div'. */
  is?: Component | string;
  /** Determines the vertical positioning of the layout within its container. Options are 'top' or 'bottom'. */
  vertical?: 'top' | 'bottom';
}

const props = withDefaults(defineProps<FixedLayoutProps>(), {
  is: 'div',
  vertical: 'bottom',
});

const classes = computed(() => ({
  wrapper: true,
  [`wrapper--${props.vertical}`]: true,
}));
</script>

<style lang="scss" scoped>
.wrapper {
  position: fixed;
  left: 0;
  right: 0;
}

.wrapper--top {
  top: 0;
}

.wrapper--bottom {
  padding-bottom: var(--tgui-safe-area-inset-bottom);
  bottom: 0;
}
</style>
