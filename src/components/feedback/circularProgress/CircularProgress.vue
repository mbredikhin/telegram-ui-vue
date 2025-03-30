<template>
  <svg
    class="circular-progress"
    :width="circleAttributes.size"
    :height="circleAttributes.size"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      :cx="circleSize"
      :cy="circleSize"
      :r="circleAttributes.radius"
      stroke-opacity=".1"
      :stroke-width="circleAttributes.strokeWidth"
      fill="none"
    />
    <circle
      fill="none"
      :cx="circleSize"
      :cy="circleSize"
      :r="circleAttributes.radius"
      :stroke-width="circleAttributes.strokeWidth"
      stroke-linecap="round"
      :stroke-dasharray="circumference"
      :stroke-dashoffset="circumference * ((100 - progress) / 100)"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';

/**
 * Renders a circular progress indicator, useful for displaying loading states or progress metrics.
 * The component dynamically adjusts its size and stroke based on the provided `size` prop and visually represents
 * the `progress` prop as a percentage of the circle's circumference.
 */

export interface CircularProgressProps {
  /** Specifies the size of the circular progress indicator. Can be 'small', 'medium', or 'large'. */
  size?: 'small' | 'medium' | 'large';
  /** Current progress of the circular indicator, expressed as a percentage from 0 to 100. */
  progress?: number;
}

const props = withDefaults(defineProps<CircularProgressProps>(), {
  size: 'medium',
  progress: 0,
});

const circleAttributes = computed(() => getCircleAttributes(props.size));

const circumference = computed(
  () => 2 * Math.PI * circleAttributes.value.radius
);

const circleSize = computed(() => circleAttributes.value.size / 2);

function getCircleAttributes(size: 'small' | 'medium' | 'large') {
  switch (size) {
    case 'large':
      return {
        size: 56,
        strokeWidth: 4,
        radius: 18,
      };

    case 'medium':
      return {
        size: 36,
        strokeWidth: 3,
        radius: 14,
      };

    case 'small':
      return {
        size: 28,
        strokeWidth: 3,
        radius: 10,
      };

    default:
      return {
        size: 36,
        strokeWidth: 3,
        radius: 14,
      };
  }
}
</script>

<style lang="scss" scoped>
.circular-progress {
  stroke: var(--tgui-link-color);
  transform: rotate(-90deg);
}
</style>
