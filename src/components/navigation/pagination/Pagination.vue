<template>
  <div role="tablist" :aria-disabled="props.disabled" :class="classes">
    <Headline
      :is="isItemEllipsis(item) ? 'div' : 'button'"
      v-for="item of paginationItems"
      :key="`${item.type}${item.page}`"
      :aria-disabled="item.disabled || undefined"
      :aria-current="item['aria-current']"
      :class="{
        button: true,
        'button--ellipsis': isItemEllipsis(item),
        'button--selected': item.selected,
        'button--disabled': item.disabled,
      }"
      weight="2"
      v-bind="{
        onClick: item.disabled || isItemEllipsis(item) ? null : item.onClick,
      }"
    >
      <ChevronLeft24Icon
        v-if="item.type === PaginationType.Previous"
        class="icon"
      />
      <ChevronRight24Icon
        v-else-if="item.type === PaginationType.Next"
        class="icon"
      />
      <span v-else-if="isItemEllipsis(item)">...</span>
      <span v-else>{{ item.page }}</span>
    </Headline>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';
import { PaginationType, usePagination, UsePaginationItem } from './lib';
import Headline from '@/components/typography/headline/Headline.vue';
import ChevronLeft24Icon from '@/icons/24/chevron-left.svg';
import ChevronRight24Icon from '@/icons/24/chevron-right.svg';

/**
 * The Pagination component displays a set of navigation controls allowing users to navigate through pages of content.
 * It is built on top of a custom hook that manages pagination logic and state.
 * This component can be customized to hide next/previous buttons, specify boundary and sibling count for pagination items, and handle page changes through an `change` event.
 */

export interface PaginationProps {
  /** Number of always visible pages at the beginning and end. */
  boundaryCount?: number;
  /** The total number of pages. */
  count?: number;
  /** The page selected by default when the component is uncontrolled */
  defaultPage?: number;
  /** If `true`, hide the next-page button. */
  hideNextButton?: boolean;
  /** If `true`, hide the previous-page button. */
  hidePrevButton?: boolean;
  /** The current page. */
  page?: number;
  /** Number of always visible pages before and after the current page. */
  siblingCount?: number;
  /** Controls whether the Pagination component is interactive. */
  disabled?: boolean;
}

const props = defineProps<PaginationProps>();

const emit = defineEmits<{
  (e: 'change', event: Event, page: number): void;
}>();

const { paginationItems } = usePagination({ ...toRefs(props), onChange });

const classes = computed(() => ({
  pagination: true,
  'pagination--disabled': props.disabled,
}));

const isItemEllipsis = computed(
  () => (item: UsePaginationItem) =>
    [PaginationType.StartEllipsis, PaginationType.EndEllipsis].includes(
      item.type
    )
);

function onChange(event: Event, page: number) {
  emit('change', event, page);
}
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  gap: 8px;
  padding: 16px;
}

.pagination--disabled {
  opacity: 0.35;
}

.button {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-width: 44px;
  height: 44px;
  color: var(--tgui-hint-color);
  padding: 0 10px;
  border: none;
  border-radius: 12px;
  background: transparent;
}

.button--selected {
  color: var(--text-color);
  background: var(--tgui-tertiary-bg-color);
}

.button--disabled {
  cursor: default;
  opacity: 0.35;
}

.button--ellipsis {
  cursor: default;
  opacity: 1;
}

.icon {
  color: var(--tgui-link-color);
}
</style>
