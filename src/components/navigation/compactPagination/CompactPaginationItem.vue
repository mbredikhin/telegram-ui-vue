<template>
  <button
    type="button"
    role="tab"
    :aria-selected="props.selected"
    v-bind="attrs"
    :class="classes"
  >
    <VisuallyHidden v-if="hasSlotContent(slots.default)">
      <slot />
    </VisuallyHidden>
  </button>
</template>

<script setup lang="ts">
import { VisuallyHidden } from '@/components/service';
import { hasSlotContent } from '@/lib/vue';
import { ButtonHTMLAttributes, computed, useAttrs, VNode } from 'vue';

export interface CompactPaginationItemProps
  extends /* @vue-ignore */ ButtonHTMLAttributes {
  selected?: boolean;
}

const props = withDefaults(defineProps<CompactPaginationItemProps>(), {
  selected: false,
});

const slots = defineSlots<{
  /** Content of the compact pagination item component.  */
  default?: () => VNode[];
}>();

const attrs: ButtonHTMLAttributes = useAttrs();

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
  background: var(
    --tgui-compact-pagination-dot-background--selected,
    var(--tgui-link-color)
  );
}

.compact-pagination-item--selected {
  opacity: 1;
}
</style>
