<template>
  <Cell :class="classes" v-bind="attrs">
    <template v-for="(_, slot) of slots" #[slot]>
      <slot :name="slot" />
    </template>
    <template v-if="hasSlotContent(slots.subtitle)" #subtitle>
      <span class="subtitle">
        <slot name="subtitle" />
      </span>
    </template>
    <template v-if="hasSlotContent(slots.default)" #default>
      <span class="header">
        <slot />
      </span>
    </template>
  </Cell>
</template>

<script setup lang="ts">
import { computed, inject, useAttrs, VNode } from 'vue';
import { cardInjectionKey } from './lib';
import { Cell, CellProps } from '@/components/blocks';
import { hasSlotContent } from '@/lib/vue';

export interface CardCellProps extends /* @vue-ignore */ CellProps {}

defineProps<CardCellProps>();

const slots = defineSlots<{
  /** Content displayed above the main content as a subheading */
  subhead?: () => VNode[];
  /** Main content displayed as a header */
  default?: () => VNode[];
  /** Content displayed alongside the header as a hint */
  hint?: () => VNode[];
  /** A badge component to be displayed next to the header */
  ['title-badge']?: () => VNode[];
  /** Content displayed below the header as a subtitle */
  subtitle?: () => VNode[];
  /** Additional description displayed below the subtitle */
  description?: () => VNode[];
  /** Content or elements to be displayed on the left side of the cell */
  before?: () => VNode[];
  /** Content or elements to be displayed on the right side of the cell */
  after?: () => VNode[];
}>();

const attrs: CellProps = useAttrs();
const cardInjection = inject(cardInjectionKey);

const classes = computed(() => ({
  ['card-cell']: true,
  ['card-cell--ambient']: cardInjection?.value?.type === 'ambient',
}));
</script>

<style lang="scss" scoped>
.wrapper {
  --tgui-cell-middle-padding: 16px 0;
  padding: 0 20px;
  background: var(--tgui-card-bg-color);
}

.wrapper--ambient {
  --tgui-text-color: var(--tgui-white);
  --tgui-hint-color: rgba(255, 255, 255, 0.75);

  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding-top: 48px;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    var(--tgui-black) 100%
  );
}

.subtitle {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: break-spaces;
}

.header {
  font-weight: var(--tgui-font-weight-accent-2);
}

.card-cell--ambient .header {
  color: var(--tgui-white);
}
</style>
