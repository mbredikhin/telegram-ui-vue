<template>
  <slot />
</template>

<script setup lang="ts">
import { computed, provide } from 'vue';
import {
  AccordionInjection,
  accordionInjectionKey,
  useAccordionId,
} from './lib';

export interface AccordionProps {
  /**
   * Optional ID for the accordion element, enhancing accessibility (a11y) by associating the accordion
   * summary and content. If not provided, a unique ID will be generated automatically.
   * This ID is crucial for screen readers and other assistive technologies to understand the
   * relationship between the accordion header and content.
   */
  id?: string;
  /** Determines whether the accordion is currently expanded or collapsed. */
  expanded: boolean;
}

const props = defineProps<AccordionProps>();

defineSlots<{
  /**
   * Content of the Accordion component. Pass `AccordionSummary` and
   * `AccordionContent` to create a functional accordion structure.
   */
  default(props: unknown): unknown;
}>();

const emit = defineEmits<{
  /** Called when the accordion's state changes, such as when it is opened or closed. */
  (e: 'change', expanded: boolean): void;
}>();

const { labelId, contentId } = useAccordionId(props.id);

const accordionInjection = computed<AccordionInjection>(() => ({
  labelId,
  contentId,
  expanded: props.expanded,
  onChange: (expanded) => emit('change', !!expanded),
}));

provide(accordionInjectionKey, accordionInjection);
</script>
