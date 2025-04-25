<template>
  <Cell
    :id="accordionInjection.labelId"
    :aria-expanded="accordionInjection.expanded"
    :aria-controls="accordionInjection.contentId"
    v-bind="props"
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
import { type Component, type Ref, inject } from 'vue';
import ChevronDown24Icon from '@/icons/24/chevron_down.svg';
import { Cell } from '@/components';
import { accordionInjectionKey, AccordionInjection } from '../lib';

/**
 * `AccordionSummary` serves as the clickable header for an accordion section, toggling the visibility of the content.
 * It incorporates an expand/collapse icon to visually indicate state. This component further extends `Cell` to provide
 * a consistent UI and accessibility features.
 */

export interface AccordionSummaryProps {
  /** Custom component or HTML tag to be used as the root element of the cell, div by default */
  is?: Component | string;
  /** Controls the hover state of the component externally, useful for keyboard navigation */
  hovered?: boolean;
  /** Allows for multiline content without truncation */
  multiline?: boolean;
  interactiveAnimation?: 'opacity' | 'background';
}

const props = defineProps<AccordionSummaryProps>();

const slots = defineSlots<{
  /** Content displayed above the main content as a subheading */
  subhead(props?: unknown): unknown;
  /** Main content displayed as a header */
  default(props?: unknown): unknown;
  /** Content displayed alongside the header as a hint */
  hint(props?: unknown): unknown;
  /** A badge component to be displayed next to the header */
  ['title-badge'](props?: unknown): unknown;
  /** Content displayed below the header as a subtitle */
  subtitle(props?: unknown): unknown;
  /** Additional description displayed below the subtitle */
  description(props?: unknown): unknown;
  /** Content or elements to be displayed on the left side of the cell */
  before(props?: unknown): unknown;
  /** Content or elements to be displayed on the right side of the cell */
  after(props?: unknown): unknown;
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
