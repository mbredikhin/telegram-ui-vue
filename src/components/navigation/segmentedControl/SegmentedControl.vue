<template>
  <div role="tablist" :class="classes">
    <div class="body">
      <div
        v-if="checkedIndex > -1"
        aria-hidden
        class="slider"
        :style="{
          width: `${100 / items?.length}%`,
          transform: translateX,
        }"
      ></div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePlatform } from '@/composables/usePlatform';
import { computed, VNode } from 'vue';

/**
 * The SegmentedControl component renders a set of options as a segmented control, commonly used for toggling between views or filtering content.
 * It is designed to adapt its appearance based on the platform, offering a native look and feel.
 * This component supports interactivity through selection, visually indicating the currently active option.
 */

const slots = defineSlots<{
  /** Children should be SegmentedControlItem components to render within the control. */
  default?: () => VNode[];
}>();

const platform = usePlatform();

const classes = computed(() => ({
  'segmented-control': true,
  'segmented-control--ios': platform === 'ios',
}));

const items = computed<VNode[]>(
  () => (slots.default?.()?.at(0)?.children as VNode[]) ?? []
);

const checkedIndex = computed(
  () => items.value?.findIndex(({ props }) => props?.selected) ?? -1
);

const translateX = computed(() => `translateX(${100 * checkedIndex.value}%)`);
</script>

<style lang="scss" scoped>
.segmented-control {
  overflow: hidden;
  width: 100%;
  height: 100%;
  padding: 2px;
  box-sizing: border-box;
  border-radius: 44px;
  background: var(--tgui-tertiary-bg-color);
}

.body {
  position: relative;
  display: flex;
  align-items: center;
  align-content: stretch;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: inherit;
}

.slider {
  position: absolute;
  inset: 0;
  transition: transform 150ms;
  border-radius: 40px;
  z-index: var(--tgui-z-index-simple);
  box-sizing: border-box;
  background: var(--tgui-segmented-control-active-bg);
}

.segmented-control--ios {
  border-radius: 9px;
  background: var(--tgui-tertiary-bg-color);
}

.segmented-control--ios .slider {
  border: var(--tgui-border-width) solid rgba(0, 0, 0, 0.04);
  border-radius: inherit;
  box-shadow:
    0 3px 1px 0 rgba(0, 0, 0, 0.04),
    0 3px 8px 0 rgba(0, 0, 0, 0.12);
}
</style>
