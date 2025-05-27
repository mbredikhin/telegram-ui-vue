<template>
  <Tappable v-bind="attrs" :is="props.is" :class="classes">
    <div v-if="hasSlotContent(slots.before)" class="before">
      <slot name="before" />
    </div>
    <div class="middle">
      <Subheadline
        v-if="hasSlotContent(slots.subhead)"
        class="subhead"
        level="2"
        weight="3"
      >
        <slot name="subhead" />
      </Subheadline>
      <component
        :is="platform === 'ios' ? Text : Subheadline"
        v-if="
          hasSlotContent(slots.default) ||
          hasSlotContent(slots.hint) ||
          slots['title-badge']?.()
        "
        v-bind="platform === 'ios' ? {} : { level: '1' }"
        class="head"
      >
        <span v-if="hasSlotContent(slots.default)" class="title">
          <slot />
        </span>
        <span v-if="hasSlotContent(slots.hint)" class="hint">
          <slot name="hint" />
        </span>
        <slot name="title-badge" />
      </component>
      <Subheadline
        v-if="hasSlotContent(slots.subtitle)"
        class="subtitle"
        level="2"
        weight="3"
      >
        <slot name="subtitle" />
      </Subheadline>
      <component
        :is="platform === 'ios' ? Caption : Subheadline"
        v-if="hasSlotContent(slots.description)"
        v-bind="platform === 'ios' ? {} : { level: '2' }"
        class="description"
      >
        <slot name="description" />
      </component>
    </div>
    <div v-if="hasSlotContent(slots.after)" class="after">
      <slot name="after" />
    </div>
  </Tappable>
</template>

<script setup lang="ts">
import { Tappable, TappableProps } from '@/components/service';
import { Caption, Subheadline, Text } from '@/components/typography';
import { usePlatform } from '@/composables/usePlatform';
import { hasSlotContent } from '@/helpers/vue';
import { type Component, computed, useAttrs, VNode } from 'vue';

/**
 * `Cell` component acts as a flexible and interactive container for various types of content,
 * enabling the creation of complex list items, form fields, and more. It leverages the `Tappable`
 * component for interaction and is designed to be flexible and extensible.
 */

type Attrs = Omit<TappableProps, 'is'>;

export interface CellProps extends /* @vue-ignore */ Attrs {
  /** Controls the hover state of the component externally, useful for keyboard navigation */
  hovered?: boolean;
  /** Allows for multiline content without truncation */
  multiline?: boolean;
  /** Custom component or HTML tag to be used as the root element of the cell, div by default */
  is?: Component | string;
}

const props = defineProps<CellProps>();

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

const attrs: Attrs = useAttrs();
const platform = usePlatform();

const classes = computed(() => ({
  cell: true,
  ['cell--ios']: platform === 'ios',
  ['cell--hovered']: props.hovered,
  ['cell--multiline']: props.multiline,
}));
</script>

<style lang="scss" scoped>
.cell {
  --tgui-cell-middle-padding: 16px 0;

  display: flex;
  align-items: center;
  gap: 24px;
  padding: 0 24px;
}

.cell--ios {
  gap: 16px;
}

.cell--hovered {
  background: var(--tgui-tertiary-bg-color);
}

.before,
.after {
  display: flex;
  align-items: center;
  justify-content: center;
}

.middle {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex-grow: 1;
  max-inline-size: 100%;
  min-inline-size: 0;
  padding: var(--tgui-cell-middle-padding);
}

.middle > *,
.title {
  overflow: hidden;
  text-overflow: ellipsis;
}

.cell:not(.cell--multiline) .middle > *,
.cell:not(.cell--multiline) .title {
  white-space: nowrap;
}

.subhead {
  color: var(--tgui-subtitle-text-color);
}

.head {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.hint {
  color: var(--tgui-hint-color);
}

.subtitle {
  color: var(--tgui-hint-color);
}

.description {
  color: var(--tgui-hint-color);
}

.cell--ios {
  --tgui-cell-middle-padding: 12px 0;
  padding: 0 16px;
}

@media (hover: hover) and (pointer: fine) {
  .cell:hover {
    background: var(--tgui-tertiary-bg-color);
  }
}
</style>
