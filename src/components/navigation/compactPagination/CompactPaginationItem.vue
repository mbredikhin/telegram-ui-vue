<template>
  <button type="button" role="tab" :aria-selected="props.selected" :class="classes">
    <VisuallyHidden v-if="hasSlotContent"><slot /></VisuallyHidden>
  </button>
</template>

<script setup lang="ts">
import { VisuallyHidden } from '@/components/service';
import { computed, useSlots } from 'vue';

export interface CompactPaginationItemProps {
  selected?: boolean;
}

const props = withDefaults(defineProps<CompactPaginationItemProps>(), { selected: false });

const slots = useSlots();

const hasSlotContent = computed(() => !!slots.default?.());

const classes = computed(() => ({
  'compact-pagination-item': true,
  'compact-pagination-item--selected': props.selected,
}));
</script>

<style lang="scss" scoped>
.compact-pagination-item {
  cursor: pointer;
  display: block;
  width: 8px;
  height: 8px;
  padding: 0;
  border: none;
  border-radius: 50%;
  transition: opacity 0.15s ease-in-out;
  opacity: var(--tgui-compact-pagination-dot-opacity--selected, 0.25);
  background: var(--tgui-compact-pagination-dot-background--selected, var(--tgui-link-color));
}

.compact-pagination-item--selected {
  opacity: 1;
}
</style>
