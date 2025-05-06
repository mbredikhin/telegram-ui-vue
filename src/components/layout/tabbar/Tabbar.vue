<template>
  <FixedLayout :class="classes">
    <slot />
  </FixedLayout>
</template>

<script setup lang="ts">
import { usePlatform } from '@/composables/usePlatform';
import { computed, VNode } from 'vue';
import FixedLayout from '../fixedLayout/FixedLayout.vue';

/**
 * Serves as a container for `TabbarItem` components, rendering a navigational tab bar.
 * Utilizes a `FixedLayout` to ensure the tab bar remains positioned at a specific area within a view,
 * typically at the bottom of the screen, making it ideal for mobile or web application navigation menus.
 * The component adapts its styling based on the platform, providing a consistent look and feel across different devices.
 */

defineSlots<{
  /** The child elements of the Tabbar, expected to be `TabbarItem` components. */
  default(): VNode[];
}>();

const platform = usePlatform();

const classes = computed(() => ({
  tabbar: true,
  ['tabbar--ios']: platform === 'ios',
}));
</script>

<style lang="scss" scoped>
.tabbar {
  display: flex;
  justify-items: stretch;
  box-shadow: 0 -1px 0 var(--tgui-divider);
  background: var(--tgui-surface-primary);
  padding: 0 16px;
}

.wrapper--ios {
  padding: 0;
}
</style>
