<template>
  <div role="tablist" class="tabs-list">
    <div
      v-if="checkedIndex > -1"
      aria-hidden
      class="slider"
      :style="{
        width: `${100 / items.length}%`,
        transform: translateX,
      }"
    ></div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, VNode } from 'vue';

/**
 * The TabsList component renders a list of tabs, typically used for navigating between different views
 * or filtering content. It visually indicates the currently active tab and supports custom styling.
 */

const slots = defineSlots<{
  /** Children should be TabsListItem components to be rendered as tabs. */
  default?: () => VNode[];
}>();

const items = computed<VNode[]>(
  () => (slots.default?.()?.at(0)?.children as VNode[]) ?? []
);

const checkedIndex = computed(
  () => items.value?.findIndex(({ props }) => props?.selected) ?? -1
);

const translateX = computed(() => `translateX(${100 * checkedIndex.value}%)`);
</script>

<style lang="scss" scoped>
.tabs-list {
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  align-content: stretch;
  gap: 12px;
  width: 100%;
  height: 100%;
}

.slider {
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 3px;
  transition: transform 125ms;
  border-radius: 4px 4px 1px 1px;
  background: var(--tgui-button-color);
}
</style>
