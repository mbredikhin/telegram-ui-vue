<template>
  <Tappable is="button" role="tab" :class="classes">
    <Caption :weight="props.selected ? '2' : '3'">
      <slot />
    </Caption>
  </Tappable>
</template>

<script setup lang="ts">
import { Tappable } from '@/components/service';
import { Caption } from '@/components/typography';
import { usePlatform } from '@/composables/usePlatform';
import { computed } from 'vue';

/**
 * A component representing an individual item within a SegmentedControl.
 * It leverages the Tappable component for handling interactions and supports platform-specific styles.
 */

export interface SegmentedControlItemProps {
  /** Whether the item is selected. Used by the parent SegmentedControl to style accordingly. */
  selected?: boolean;
}

const props = withDefaults(defineProps<SegmentedControlItemProps>(), {
  selected: false,
});

const platform = usePlatform();

const classes = computed(() => ({
  ['segmented-control-item']: true,
  ['segmented-control-item--ios']: platform === 'ios',
}));
</script>

<style lang="scss" scoped>
.segmented-control-item {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  flex: 1 1 0;
  max-inline-size: 100%;
  padding: 10px 24px;
  border: none;
  border-radius: inherit;
  background: transparent;
  z-index: var(--tgui-z-index-simple);
  color: var(--tgui-text-color);
}

.segmented-control-item--ios {
  padding: 6px 24px;
}
</style>
