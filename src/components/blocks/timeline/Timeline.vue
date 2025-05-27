<template>
  <component :is="props.horizontal ? HorizontalScroll : 'ul'" :class="classes">
    <template v-for="(vnode, index) in defaultSlotContent" :key="index">
      <component
        :is="vnode"
        v-if="isVNode(vnode)"
        :mode="getChildMode(index + 1)"
        :horizontal="props.horizontal"
      />
      <component :is="vnode" v-else />
    </template>
  </component>
</template>

<script setup lang="ts">
import { computed, isVNode, VNode } from 'vue';
import { TimelineItemProps } from './TimelineItem.vue';
import { HorizontalScroll } from '@/components/service';

/**
 * Renders a sequence of events or steps in either a vertical or horizontal layout. It is flexible,
 * supporting an active state to visually distinguish past, present, and future steps.
 */

export interface TimelineProps {
  /** Determines the orientation of the timeline. If true, the timeline is displayed horizontally. */
  horizontal?: boolean;
  /** The index of the active item in the timeline, which affects styling to indicate progress. */
  active?: number;
}

const props = defineProps<TimelineProps>();

const slots = defineSlots<{
  /** The default slot of the Timeline, expected to be a collection of `TimelineItem` components. */
  default?: () => VNode[];
}>();

const classes = computed(() => ({
  timeline: true,
  ['timeline--horizontal']: props.horizontal,
}));

const defaultSlotContent = computed(() => slots.default?.() ?? []);

function getChildMode(childNumber: number): TimelineItemProps['mode'] {
  if (!props.active) {
    return undefined;
  }
  if (childNumber <= props.active) {
    return 'active';
  }
  if (childNumber === props.active + 1) {
    return 'pre-active';
  }
  return undefined;
}
</script>

<style lang="scss" scoped>
.timeline {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px 44px;
  margin: 0;
  &--horizontal {
    flex-direction: row;
  }
}
</style>
