<template>
  <li :class="classes">
    <div class="side">
      <div class="line"></div>
      <div class="dot"></div>
    </div>
    <div class="fields">
      <Text class="title" weight="2">{{ props.header }}</Text>
      <Subheadline class="description" :level="platform === 'ios' ? '1' : '2'">
        <slot />
      </Subheadline>
    </div>
  </li>
</template>

<script setup lang="ts">
import { Subheadline, Text } from '@/components/typography';
import { usePlatform } from '@/composables/usePlatform';
import { computed, LiHTMLAttributes, VNode } from 'vue';

export interface TimelineItemProps extends /* @vue-ignore */ LiHTMLAttributes {
  /** Internal prop, but you can change it. Marks line and dot of the item */
  mode?: 'active' | 'pre-active';
  /** If true, the item will be horizontal, passed from parent */
  horizontal?: boolean;
  /** Header of the item */
  header?: string;
}

const props = defineProps<TimelineItemProps>();

defineSlots<{
  /** Description of the item */
  default?: () => VNode[];
}>();

const platform = usePlatform();

const classes = computed(() => ({
  ['timeline-item']: true,
  [`timeline-item--${props.mode}`]: !!props.mode,
  ['timeline-item--ios']: platform === 'ios',
  ['timeline-item--horizontal']: props.horizontal,
}));
</script>

<style lang="scss" scoped>
.timeline-item {
  --tgui-timeline-item-thickness: 4px;
  --tgui-timeline-item-size: 12px;

  display: flex;
  gap: 32px;
  &:last-child .line {
    display: none;
  }
  &--active .line,
  &--active .dot {
    background: var(--tgui-link-color);
  }
  &--pre-active .dot {
    background: var(--tgui-link-color);
  }
  &--ios .side {
    --tgui-timeline-item-size: 16px;
  }
  &--ios .dot {
    top: 6px;
  }
  &--ios .line {
    top: 6px;
    height: calc(100% + 26px);
  }
  &--horizontal {
    gap: 24px;
    flex-direction: column;
  }
  &--horizontal .side {
    height: var(--tgui-timeline-item-size);
    display: flex;
    align-items: center;
  }
  &--horizontal .dot {
    top: 0;
  }
  &--horizontal .line {
    top: 50%;
    left: 0;
    height: var(--tgui-timeline-item-thickness);
    width: calc(100% + 36px);
    transform: translateY(-50%);
  }
  &--horizontal .title {
    white-space: nowrap;
  }
}

.side {
  position: relative;
  min-width: var(--tgui-timeline-item-size);
}

.dot {
  position: absolute;
  top: 4px;
  left: 0;
  width: var(--tgui-timeline-item-size);
  height: var(--tgui-timeline-item-size);
  border-radius: 50%;
  background: var(--tgui-quartenary-bg-color);
}

.line {
  position: absolute;
  top: 24px;
  bottom: 0;
  left: 50%;
  height: calc(100% - 4px);
  width: var(--tgui-timeline-item-thickness);
  border-radius: 2px;
  transform: translateX(-50%);
  background: var(--tgui-quartenary-bg-color);
}

.fields {
  overflow: hidden;
}

.title {
  display: inline-block;
  margin-bottom: 4px;
}

.description {
  color: var(--tgui-hint-color);
}
</style>
