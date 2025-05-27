<template>
  <Cell
    :id="accordionInjection.labelId"
    :aria-expanded="accordionInjection.expanded"
    :aria-controls="accordionInjection.contentId"
    v-bind="attrs"
    @click="toggle"
  >
    <template v-for="(_, slot) of slots" #[slot]>
      <slot :name="slot" />
    </template>
    <template #after>
      <slot name="after">
        <ChevronDown24Icon
          :class="{
            chevron: true,
            ['chevron--expanded']: accordionInjection.expanded,
          }"
        />
      </slot>
    </template>
  </Cell>
</template>

<script setup lang="ts">
import { type Ref, VNode, inject, useAttrs } from 'vue';
import ChevronDown24Icon from '@/icons/24/chevron-down.svg';
import { Cell, CellProps } from '@/components/blocks';
import { accordionInjectionKey, AccordionInjection } from '../lib';

/**
 * `AccordionSummary` serves as the clickable header for an accordion section, toggling the visibility of the content.
 * It incorporates an expand/collapse icon to visually indicate state. This component further extends `Cell` to provide
 * a consistent UI and accessibility features.
 */

export interface AccordionSummaryProps extends /* @vue-ignore */ CellProps {}

defineProps<AccordionSummaryProps>();

const attrs: CellProps = useAttrs();

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

const accordionInjection = inject(
  accordionInjectionKey
) as Ref<AccordionInjection>;

function toggle() {
  return accordionInjection.value.onChange(!accordionInjection.value.expanded);
}
</script>

<style scoped>
.chevron {
  transition: transform 0.15s ease-out;
  color: var(--tgui-link-color);
}

.chevron--expanded {
  transform: rotate(180deg);
}
</style>
