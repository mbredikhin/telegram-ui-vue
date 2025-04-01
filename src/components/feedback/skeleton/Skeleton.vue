<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

/**
 * Used as a placeholder during the loading state of a component or page. It can visually mimic
 * the layout that will be replaced by the actual content once loaded, improving user experience by reducing perceived loading times.
 */

export interface SkeletonProps {
  /** If true, disables the shimmering animation of the skeleton. */
  withoutAnimation?: boolean;
  /** If true, the skeleton overlay is shown above the content. When false, the skeleton is hidden, showing any underlying content. */
  visible?: boolean;
}

const props = defineProps<SkeletonProps>();

const classes = computed(() => ({
  skeleton: true,
  ['skeleton--visible']: props.visible,
  ['skeleton--no-animation']: props.withoutAnimation,
}));
</script>

<style lang="scss" scoped>
.skeleton {
  position: relative;
}

.skeleton--visible::before,
.skeleton--visible::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: var(--tgui-z-index-simple);
}

.skeleton::before {
  background: var(--tgui-secondary-bg-color);
}

.skeleton:not(.skeleton--no-animation)::after {
  z-index: var(--tgui-z-index-skeleton);
  background-color: var(--tgui-bg-color);
  animation: fade 1.8s linear infinite;
}

@keyframes fade {
  0%,
  100% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.7;
  }
}
</style>
