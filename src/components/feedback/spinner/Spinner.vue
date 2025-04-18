<template>
  <div role="status" :class="classes">
    <component :is="is" :size="props.size" />
  </div>
</template>

<script setup lang="ts">
import { usePlatform } from '@/composables/usePlatform';
import { computed } from 'vue';
import IosSpinner from './IosSpinner/IosSpinner.vue';
import BaseSpinner from './BaseSpinner/BaseSpinner.vue';

/**
 * Provides a visual indicator for loading states across different platforms. It automatically selects
 * an appropriate spinner style based on the current platform, allowing for a consistent user experience.
 */

export interface SpinnerProps {
  /** Determines the size of the spinner. Can be 'small' (s), 'medium' (m), or 'large' (l), with 'medium' being the default size. */
  size: 's' | 'm' | 'l';
}

const props = withDefaults(defineProps<SpinnerProps>(), {
  size: 'm',
});

const platform = usePlatform();

const is = computed(() => (platform === 'ios' ? IosSpinner : BaseSpinner));

const classes = computed(() => ({
  spinner: true,
  ['spinner--ios']: platform === 'ios',
  [`spinner--${props.size}`]: true,
}));
</script>

<style lang="scss" scoped>
.spinner {
  color: var(--tgui-link-color);
}

.spinner--ios {
  color: var(--tgui-hint-color);
}
</style>
