<template>
  <div :class="classes" :style="arrow.styles">
    <component :is="props.icon" class="icon" />
  </div>
</template>

<script setup lang="ts">
import { Coords, Placement } from '@floating-ui/vue';
import { type Component, computed } from 'vue';
import { useFloatingArrow } from './lib/useFloatingArrow';
import DefaultArrowIcon from './icons/Arrow.vue';

/**
 * FloatingArrow dynamically positions an arrow indicator relative to a floating element,
 * such as a tooltip to signify its association with a target element.
 * Supports custom arrow icons and positioning adjustments.
 */

export interface FloatingArrowProps {
  /** Optional distance from the target element, influencing the arrow's placement. */
  offset?: number;
  /** When true, the offset distance remains constant, regardless of the arrow's placement. */
  isStaticOffset?: boolean;
  /** Coordinates for the arrow, useful for precise positioning when the arrow is not directly adjacent to its target. */
  coords?: Partial<Coords>;
  /** The preferred placement of the arrow relative to its target element. */
  placement?: Placement;
  /** A component for rendering the arrow icon, allowing for custom arrow designs. */
  icon?: Component;
}

const props = withDefaults(defineProps<FloatingArrowProps>(), {
  offset: undefined,
  coords: undefined,
  placement: 'bottom',
  icon: DefaultArrowIcon,
});

const arrow = useFloatingArrow(props);

const classes = computed(() => ({
  ['floating-arrow']: true,
  [`floating-arrow--placement-${arrow.value.placement}`]:
    !!arrow.value.placement,
}));
</script>

<style lang="scss" scoped>
.floating-arrow {
  position: absolute;
}

.icon {
  content: '';
  display: block;
  transform: translateY(1px);
}

.floating-arrow--placement-right {
  transform: rotate(90deg) translate(50%, -50%);
  transform-origin: right;
}

.floating-arrow--placement-bottom {
  transform: rotate(180deg);
}

.floating-arrow--placement-left {
  transform: rotate(-90deg) translate(-50%, -50%);
  transform-origin: left;
}
</style>
