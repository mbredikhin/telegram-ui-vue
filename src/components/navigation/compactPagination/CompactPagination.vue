<template>
  <div role="tablist" :class="classes">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
/**
 * Displays a compact set of pagination controls. This component allows users to navigate
 * between pages of content. It supports several themes for customization and can fit within various UI designs.
 */

export interface CompactPaginationProps {
  /** Sets the color theme of the pagination. */
  mode?: 'default' | 'ambient' | 'white';
}
const props = withDefaults(defineProps<CompactPaginationProps>(), { mode: 'default' });

const classes = computed(() => ({
  'compact-pagination': true,
  [`compact-pagination--${props.mode}`]: true,
}));
</script>

<style lang="scss" scoped>
.compact-pagination {
  --tgui-compact-pagination-dot-opacity--selected: 0.1;
  --tgui-compact-pagination-dot-background--selected: var(--tgui-link-color);

  display: inline-flex;
  gap: 8px;
  padding: 4px;
}

.compact-pagination--ambient {
  --tgui-compact-pagination-dot-opacity--selected: 0.25;
  --tgui-compact-pagination-dot-background--selected: var(--tgui-white);

  padding: 8px 9px;
  gap: 6px;
  border-radius: 28px;
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(22px);
  -webkit-backdrop-filter: blur(22px);
}

.compact-pagination--white {
  --tgui-compact-pagination-dot-opacity--selected: 0.25;
  --tgui-compact-pagination-dot-background--selected: var(--tgui-white);

  gap: 6px;
  padding: 0;
}
</style>
