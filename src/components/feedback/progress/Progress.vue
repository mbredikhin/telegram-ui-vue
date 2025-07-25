<template>
  <div
    role="progressbar"
    :aria-valuenow="progress"
    :aria-valuemin="PROGRESS_MIN_VALUE"
    :aria-valuemax="PROGRESS_MAX_VALUE"
    :class="classes"
    :title="title"
  >
    <div aria-hidden :style="progressLineStyle" class="progress__line"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { clamp } from '@/lib/math';
import { usePlatform } from '@/composables/usePlatform';

/**
 * Renders a linear progress bar that visually represents completion percentage towards a goal.
 */

export interface ProgressProps {
  /** The current value of the progress bar, expressed as a percentage. The value should be between 0 and 100. */
  value?: number;
}

const props = withDefaults(defineProps<ProgressProps>(), {
  value: 0,
});

const PROGRESS_MIN_VALUE = 0;
const PROGRESS_MAX_VALUE = 100;
const platform = usePlatform();

const progress = computed<number>(() =>
  clamp(props.value, PROGRESS_MIN_VALUE, PROGRESS_MAX_VALUE)
);

const title = computed<string>(
  () => `${progress.value} / ${PROGRESS_MAX_VALUE}`
);

const classes = computed<string[]>(() => ['progress', `progress--${platform}`]);

const progressLineStyle = computed<Record<string, string>>(() => ({
  width: progress.value + '%',
}));
</script>

<style lang="scss" scoped>
.progress {
  height: 4px;
  border-radius: 4px;
  &--base {
    background-color: var(--tgui-secondary-fill);
  }
  &--ios {
    background-color: transparent;
  }
}

.progress__line {
  background-color: var(--tgui-link-color);
  height: 4px;
  border-radius: 4px;
}
</style>
