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
/**
 * Renders a linear progress bar that visually represents completion percentage towards a goal.
 */
import { computed, inject, type Ref } from 'vue';
import { clamp } from '@/helpers/math';
import { type AppRootInjection, appRootInjectionKey } from '@/components/service';

interface ProgressProps {
  value?: number;
}

const props = withDefaults(defineProps<ProgressProps>(), {
  value: 0,
});

const PROGRESS_MIN_VALUE = 0;
const PROGRESS_MAX_VALUE = 100;
const appRootInjection = inject(appRootInjectionKey) as Ref<AppRootInjection>;

const progress = computed<number>(() => clamp(props.value, PROGRESS_MIN_VALUE, PROGRESS_MAX_VALUE));

const title = computed<string>(() => `${progress.value} / ${PROGRESS_MAX_VALUE}`);

const classes = computed<string[]>(() => [
  'progress',
  `progress--${appRootInjection.value.platform}`,
]);

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
