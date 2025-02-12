<template>
  <component :is="props.is" :class="classes">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { type Component, computed } from 'vue';
import { usePlatform } from '@/composables/usePlatform';
/**
 * Renders a container for list items, applying platform-specific styles for consistency across different operating systems.
 * This component serves as a foundational element for creating lists in a user interface.
 */

export interface ListProps {
  /** Specifies the HTML tag or component used to render the list, defaulting to `div`. */
  is?: string | Component;
}

const props = withDefaults(defineProps<ListProps>(), { is: 'div' });

const platform = usePlatform();

const classes = computed(() => ({
  list: true,
  'list--ios': platform === 'ios',
}));
</script>

<style lang="scss" scoped>
.list > *:not(:last-child) {
  margin-bottom: 12px;
}

.list--ios {
  padding: 10px 18px;
  box-sizing: border-box;
}
</style>
